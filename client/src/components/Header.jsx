import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = () => {
    try {
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (e) {
      navigate("/signin");
    }
  };

  const more = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const list = () => {
    navigate("/listing");
  };

  const goList = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/seller");
    else navigate("/signup");
  };

  const getUserEmail = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.email;
      } catch (e) {
        console.error("Invalid token", e);
        return null;
      }
    }
    return null;
  };

  return (
    <>
      <div className="h-auto w-full flex p-4 md:p-8 bg-black border-b-2 border-b-gray-200 flex-wrap">
        <div className="w-full md:w-[30%] h-[100%] font-bold flex items-center justify-center">
          <button onClick={() => navigate("/")}>
            <div className="font-bh text-white text-4xl md:text-6xl">VENDIFY</div>
          </button>
        </div>
        <div className="w-full md:w-[70%] flex flex-wrap justify-center items-center space-x-4 md:space-x-8 mt-4 md:mt-0">
          <button
            className="font-poppins font-bold transition-all duration-300 text-black p-2 text-xs shadow-2xl bg-white hover:bg-gold transition-all duration-500"
            onClick={() => navigate("/incoming")}
          >
            Incoming offers
          </button>
          <button
            className="font-poppins font-bold transition-all duration-300 text-black p-2 text-xs shadow-2xl bg-white hover:bg-gold transition-all duration-500"
            onClick={() => navigate("/Sending")}
          >
            Sent offers
          </button>
          <button
            className="font-poppins font-bold transition-all duration-300 text-black p-2 text-xs shadow-2xl bg-white hover:bg-gold transition-all duration-500"
            onClick={list}
          >
            Edit your listings
          </button>
          <button
            className="font-poppins font-bold transition-all duration-300 text-black p-2 text-xs shadow-2xl bg-white hover:bg-gold transition-all duration-500"
            onClick={goList}
          >
            Create a listing
          </button>
          <div className="relative">
            <button
              className="font-poppins font-bold transition-all duration-300 text-black p-2 text-xs shadow-2xl bg-white hover:bg-gold transition-all duration-500"
              onClick={more}
            >
              User details
            </button>
            {open && (
              <div className="mt-2 z-50 bg-white z-[1000px] absolute p-2 shadow-lg rounded-xl w-48 md:w-56">
                <div className="text-sm p-2">
                  Email: {getUserEmail() || "No user email available"}
                </div>
                <div className="p-2 hover:bg-gray-200">
                  <button
                    className="w-full h-full text-left text-sm"
                    onClick={() => navigate('/transactions')}
                  >
                    completed offers
                  </button>
                </div>
                <div className="p-2 hover:bg-gray-200">
                  <button
                    className="w-full h-full text-left text-sm text-red-500"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
