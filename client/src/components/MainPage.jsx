import { useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from './Header.jsx'
import Card from "./Card.jsx";
import ContentContainer from "./ContentContainer.jsx";
import im2 from '../public/im2.png'
export default function MainPage(){
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {

            const token = localStorage.getItem('token')

            if(!token){
                navigate('/signin')
            }else if(jwtDecode(token).exp*1000 < Date.now()){
                localStorage.removeItem('token');
                navigate('/signin')
            }
        }, 1000)
       return () => clearInterval(interval) 
    }, [])

    return (
        <div className="min-h-screen  min-w-screen bg-black ">
            <Header/>
            <div className="w-[100%]  text-white p-10 flex-col sm:flex">
                <div className="w-[50%]"></div>
                <div className="w-[50%] font-bold text-white  p-4 m-4 text-Gld">
                        <div className="m-3 font-poppins text-Gld text-6xl">Sell Smart, </div>
                        <div className="m-3 font-poppins text-Gld text-6xl">Sell fast,</div>
                        <div className="m-3 font-poppins text-Gld"> <span className="text-6xl">Sell with </span> <span className="font-bh text-6xl tracking-wide">Vendify </span></div>
                </div>
            </div>
            <div className="  w-[100%]  flex justify-center items-center rounded-xl">
                <div className="w-[90%] bg-Gld p-6 rounded-2xl"><ContentContainer/></div>
            </div>
        </div>
    )
}