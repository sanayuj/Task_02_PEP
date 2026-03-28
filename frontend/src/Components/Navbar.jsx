
import { Share2, Cloud } from "lucide-react";

function Navbar() {
  return (
    <div> <header className="w-full border-b bg-white px-4 py-2 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">CollabDocs</h1>
       
      </div>

      
      {/* Right */}
      <div className="flex items-center gap-3">
       

        <div className="flex items-center gap-2">
        
          <button
            // onClick={onLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header></div>
  )
}

export default Navbar