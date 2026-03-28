import React from 'react'
import { Plus, Search, FileText, Trash2, LogOut } from "lucide-react";
const documents = [
  {
    _id: "1",
    title: "Project Proposal",
    updatedAt: "2 hours ago",
  },
  {
    _id: "2",
    title: "Meeting Notes",
    updatedAt: "1 day ago",
  },
  {
    _id: "3",
    title: "MERN Assignment",
    updatedAt: "3 days ago",
  },
];

function Dashboard() {
    const handleCreateDoc = () => {
    console.log("Create new document");
  };

  const handleOpenDoc = (id) => {
    console.log("Open document:", id);
  };

  const handleDeleteDoc = (id) => {
    console.log("Delete document:", id);
  };

  const handleLogout = () => {
    console.log("Logout");
  };
  return (
    <div> <div className="min-h-screen bg-[#f8f9fa]">
      {/* Navbar */}
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <FileText size={22} />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">CollabDocs</h1>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-[400px]">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search documents"
            className="bg-transparent outline-none w-full text-sm text-gray-700"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Create New Section */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Start a new document
          </h2>

          <button
            onClick={handleCreateDoc}
            className="w-52 h-36 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-3"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <Plus size={28} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Blank Document
            </span>
          </button>
        </section>

        {/* Recent Docs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Documents
            </h2>
            <span className="text-sm text-gray-500">
              {documents.length} documents
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FileText size={22} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Edited {doc.updatedAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleOpenDoc(doc._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => handleDeleteDoc(doc._id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div></div>
  )
}

export default Dashboard