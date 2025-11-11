"use client";
import React, { useState } from "react";
import { getBackendApiUrl } from "../../lib/api";
import { Person } from "../people/page";

interface AddPersonProps {
  onPersonAdded?: () => void;
}

const AddPerson: React.FC<AddPersonProps> = ({ onPersonAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Person, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(getBackendApiUrl("/Add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to add person: ${res.status}`);
      }

      setMessage("✅ Person added successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "" });

      setTimeout(() => {
        setShowForm(false);
        setMessage(null);
        onPersonAdded?.();
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage("❌ Error adding person. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Person
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border rounded-lg p-4 bg-gray-50 mt-4 max-w-md"
        >
          <h2 className="text-lg font-bold mb-3">Add New Person</h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border mb-2 rounded"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border mb-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border mb-2 rounded"
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border mb-4 rounded"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>

          {message && (
            <p
              className={`mt-3 text-sm ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default AddPerson;
