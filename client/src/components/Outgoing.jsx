import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import InpOup from "./InpOup"

export default function Outgoing(){
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const Navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if(!token || (jwtDecode(token).exp*1000 < Date.now())) Navigate('/signup')
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        setLoading(true)
        async function getOffers() {
            const offers1 = await fetch("https://vendify-backend-service.vercel.app/getSendOffers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: jwtDecode(localStorage.getItem('token')).email
                })
            }) 
            const offers = await offers1.json();
            if(loading === true) setLoading(false)
            setList(offers.offers)
        }
            getOffers()
    }, [])

    useEffect(() => {
        async function getOffers() {
            const offers1 = await fetch("https://vendify-backend-service.vercel.app/getSendOffers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: jwtDecode(localStorage.getItem('token')).email
                })
            }) 
            const offers = await offers1.json();
            setList(offers.offers)
        }
        const interval = setInterval(() => {
            getOffers()
        }, 6000)
        return () => clearInterval(interval)  
    }, [])

    return (
        <div className="min-w-screen min-h-screen bg-black">
        <Header />
        <div className="w-[100%] h-[100%] p-4 text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Outgoing Offers</h1>
            {
                loading === false ?
            <div className="w-[100%] h-[15%] flex flex-col justify-center items-center">
                {list.map((prod, index) => (
                            <InpOup sendMode={false} prod={prod} index={index}/>
                ))}
            </div> :
            <div className="text-white flex justify-center items-center"> 
                <div>Loading...</div>
            </div>
            }
            {loading === false && list.length === 0 ? <div className="flex flex-col justify-center items-center text-white">
                <div>Nothing to show</div>   
                <div className="font-bold"> </div> 
            </div> : null}
        </div>
    </div>
    )
}