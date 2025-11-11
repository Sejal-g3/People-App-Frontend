"use client";
import React, { useEffect, useState } from "react";
import { getBackendApiUrl } from "../../lib/api";

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPeople = async () => {
    try {
      const res = await fetch(getBackendApiUrl(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch people");
      const data = await res.json();
      setPeople(data);
    } catch (error) {
      console.error(error);
      setMessage("Error fetching people");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this person?")) return;

    try {
      const res = await fetch(getBackendApiUrl(`${id}`), {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete person");

      setPeople((prev) => prev.filter((p) => p.id !== id));
      setMessage("✅ Person deleted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error deleting person");
    }
  };

  const handleUpdate = async (person: Person) => {
    const firstName = prompt("First Name:", person.firstName);
    const lastName = prompt("Last Name:", person.lastName);
    const email = prompt("Email:", person.email);
    const phoneNumber = prompt("Phone Number:", person.phoneNumber);

    if (!firstName || !lastName || !email)
      return alert("All fields are required!");

    try {
      const res = await fetch(getBackendApiUrl(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: person.id,
          firstName,
          lastName,
          email,
          phoneNumber,
        }),
      });

      if (!res.ok) throw new Error("Failed to update person");

      setMessage("✅ Person updated successfully!");
      fetchPeople();
    } catch (error) {
      console.error(error);
      setMessage("❌ Error updating person");
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">People</h1>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {people.length === 0 ? (
        <p>No people found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">ID</th>
              <th className="text-left p-3 border-b">First Name</th>
              <th className="text-left p-3 border-b">Last Name</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">Phone Number</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{person.id}</td>
                <td className="p-3 border-b">{person.firstName}</td>
                <td className="p-3 border-b">{person.lastName}</td>
                <td className="p-3 border-b">{person.email}</td>
                <td className="p-3 border-b">{person.phoneNumber}</td>
                <td className="p-3 border-b space-x-2">
                  <button
                    onClick={() => handleUpdate(person)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeoplePage;
