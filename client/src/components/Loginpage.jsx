import Login from "./Login";
import Vendify from "../public/Vendify-Logo.png";

function Loginpage(props) {
    return (
        <div className="h-screen w-screen flex flex-col md:flex-row items-center bg-black">
            <div className="w-full  md:w-[50%] h-[50%] md:h-full flex flex-col items-center">
                <div className="font-serif font-bold text-4xl sm:text-6xl tracking-normal h-[20%] flex items-center justify-center">
                    
                </div>
                <div className="h-[70%] flex justify-center items-center p-8">
                    <div className="h-[100%] w-full">
                      <img src={Vendify} alt="My logo" className="w-full h-full" />
                    </div>
                </div>
            </div>

            
            <div className="w-full sm:w-[50%] h-[50%] sm:h-full flex justify-center items-center bg-black">
                <Login signup={props.signup} />
            </div>
        </div>
    );
}

export default Loginpage;
