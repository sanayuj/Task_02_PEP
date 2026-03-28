import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FileText, Share2, ArrowLeft } from "lucide-react";

function PageEditor() {
    // const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
        <div className="min-h-screen bg-[#f1f3f4]">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <FileText size={20} />
          </div>

          <div>
            <input
              type="text"
              defaultValue="Untitled Document"
              className="text-lg font-medium outline-none bg-transparent"
            />
            <p className="text-sm text-gray-500">Saved</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2">
            <Share2 size={16} />
            Share
          </button>

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex gap-4 text-sm text-gray-700">
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Bold</button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Italic</button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Underline</button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Undo</button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Redo</button>
      </div>

      {/* Editor */}
      <main className="flex justify-center py-10 px-4">
        <div className="w-full max-w-4xl min-h-[85vh] bg-white shadow-md rounded-sm p-10">
          <textarea
            placeholder="Start typing your document here..."
            className="w-full h-[75vh] resize-none outline-none text-gray-800 text-lg leading-8"
          />
        </div>
      </main>

      {/* Footer */}
      {/* <div className="text-center text-sm text-gray-500 pb-6">
        Document ID: <span className="font-medium">{id}</span>
      </div> */}
    </div>
    </div>
  )
}

export default PageEditor