
import { Share2, Cloud } from "lucide-react";
import { useEffect } from "react";
import { loginCheck, logout } from "../Services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Navbar() {
  const navigate=useNavigate()

  const onLogout = async () => {
  try {
    console.log("Clicked!!");

    const data = await logout();

    if (data.data.success) {
      toast.success("Logout successfully");
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    toast.error("Logout failed");
  }
};
  
 useEffect(() => {
  const checkLogin = async () => {
    try {
      const data = await loginCheck();
      console.log(data, "USEEFFECT@@@@");

      if (data.data.success) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  checkLogin();
}, []);



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
            onClick={onLogout}
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