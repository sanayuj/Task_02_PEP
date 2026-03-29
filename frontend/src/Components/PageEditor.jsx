import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, Share2, ArrowLeft } from "lucide-react";
import { autoSave, getDocumentById, shareDocument } from "../Services/Api";
import { socket } from "../socketSetup/SocketConfig"; 
import { toast } from "react-toastify";

function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Saved");
  const [title, setTitle] = useState("Untitled Document");
  const [loading, setLoading] = useState(true);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareRole, setShareRole] = useState("viewer");

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await getDocumentById(id);

        setTitle(res.data.title || "Untitled Document");
        setContent(res.data.content || "");
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoc();
  }, [id]);


  const handleShare = async () => {
  try {
    const res = await shareDocument(id, {
      email: shareEmail,
      role: shareRole,
    });

    console.log(res.data);
    if(res.data.success){
      toast.success(res.data.message)
      setIsShareOpen(false)
    }else{
    toast.error(res.data.message)
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    if (!id) return;

    socket.connect();

    socket.emit("join-document", id);

    socket.on("receive-changes", (data) => {
      setContent(data);
    });

    return () => {
      socket.off("receive-changes");
      socket.disconnect();
    };
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;

    setContent(value);

    socket.emit("send-changes", {
      documentId: id,
      content: value,
    });
  };

  

  useEffect(() => {
    if (!id || loading) return;

    setStatus("Saving...");

    const timeout = setTimeout(async () => {
      try {
        await autoSave(id, { title, content });
        setStatus("Saved");
      } catch (err) {
        console.log("Save error", err);
        setStatus("Error");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [title, content, id, loading]);

  return (
    <div className="min-h-screen bg-[#f1f3f4]">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <FileText size={20} />
          </div>

          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="text-lg font-medium outline-none bg-transparent"
            />
            <p className="text-sm text-gray-500">{status}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsShareOpen(true)}  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2">
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
        <button className="hover:bg-gray-100 px-3 py-1 rounded">
          Underline
        </button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Undo</button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded">Redo</button>
      </div>

      {/* Editor */}
      <main className="flex justify-center py-10 px-4">
        <div className="w-full max-w-4xl min-h-[85vh] bg-white shadow-md rounded-sm p-10">
          <textarea
            value={content}
            onChange={handleChange}
            placeholder="Start typing your document here..."
            className="w-full h-[75vh] resize-none outline-none text-gray-800 text-lg leading-8"
          />
        </div>
      </main>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pb-6">
        Document ID: <span className="font-medium">{id}</span>
      </div>

      {isShareOpen && (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
    <div className="bg-white w-[400px] rounded-xl shadow-lg p-6 relative">

      {/* Close Button */}
      <button
        onClick={() => setIsShareOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">Share Document</h2>

      {/* Email Input */}
      <input
        type="email"
        value={shareEmail}
        onChange={(e) => setShareEmail(e.target.value)}
        placeholder="Enter email"
        className="w-full border px-3 py-2 rounded-lg text-sm outline-none mb-3"
      />

      {/* Role Select */}
      <select
        value={shareRole}
        onChange={(e) => setShareRole(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg text-sm outline-none mb-4"
      >
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
      </select>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsShareOpen(false)}
          className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
        >
          Share
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default PageEditor;
