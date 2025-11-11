import Link from "next/link";
import PersonCard from "./components/PersonCard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">People App</h1>
        <p className="text-gray-600 mb-8">
          Manage your people — view, add, update, and delete records.
        </p>

        <Link
          href="/people"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to People
        </Link>

        <div className="mt-8">
          <PersonCard />
        </div>
      </div>
    </main>
  );
}
