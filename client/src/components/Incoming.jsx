import { useEffect, useRef, useState } from "react"
import {jwtDecode} from 'jwt-decode'
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import InpOup from "./InpOup"

export default function Incoming(){
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
            const offers1 = await fetch("https://vendify-backend-service.vercel.app/getOffers", {
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
            const offers1 = await fetch("https://vendify-backend-service.vercel.app/getOffers", {
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
        <div className="min-w-screen min-h-screen h-screen w-screen bg-black">
        <Header />
        <div className="w-[100%] h-[100%] p-4">
            <div className="h-[10%]">
            <h1 className="text-2xl text-white text-center font-bold mb-4">Incoming Offers</h1>
            </div>
           {
            loading === false ?
            <div className="w-[100%]  flex-col justify-items-start items-center">
                {list.map((prod, index) => (
                    <div className="flex w-full justify-center items-center">
                            <InpOup sendMode={true} prod={prod} index={index}/>
                        </div>
                ))}
            </div> :
            <div className="flex flex-row items-center justify-center"> 
                <div className="text-white">  Loading ...</div>
            </div>}
            {loading === false && list.length === 0 ? <div className="flex flex-col justify-center items-center text-white">
                <div>Nothing to show</div>   
                <div className="font-bold">Offers sent or counter offers can be seen in sent offers </div> 
            </div> : null}
        </div>
    </div>
    )
}