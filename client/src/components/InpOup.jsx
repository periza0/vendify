import { useState, useRef } from "react";
import bsp from '../public/sbp.png'
import { jwtDecode } from 'jwt-decode'
export default function InpOup({ sendMode, prod, index, tra }) {
    const [N, setN] = useState(false)
    const [Er, setEr] = useState('')
    const priceRef = useRef();
    async function counter() {
        const response = await fetch("https://vendify-backend-service.vercel.app/respondOffer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sellerEmail: prod.offeredBy,
                email: prod.offeredTo,
                price: priceRef.current.value,
                id: prod.objectId
            })
        })
        const res = await response.json()
        if (res.error) {
            setEr(res.error)
        } else {
            setN(false);
            location.reload();
        }
    }

    async function rejectOffer() {
        const response = await fetch("https://vendify-backend-service.vercel.app/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sellerEmail: prod.offeredBy,
                email: prod.offeredTo,
                price: prod.price,
                id: prod.objectId
            })
        })
        const res = await response.json()
        if (res.error) {
            setEr(res.error)
        } else {
            setN(false);
            location.reload();
        }
    }


    async function acceptOffer() {
        const response = await fetch("https://vendify-backend-service.vercel.app/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sellerEmail: prod.offeredBy,
                email: prod.offeredTo,
                price: prod.price,
                id: prod.objectId
            })
        })
        const res = await response.json()
        if (res.error) {
            setEr(res.error)
        } else {
            setN(false);
            location.reload();
        }
    }

    return (<>
        {prod.status === "PENDING" ? <div key={index} className="relative flex flex-col sm:flex-row w-[70%] h-auto sm:items-center border border-gray-800 rounded-lg shadow-md mb-4 bg-Gld overflow-hidden">
            <div className="w-full sm:w-[30%] bg-white h-[100%] flex items-center justify-center p-4 bg-gray-100">
                <img src={prod.image} className="w-full h-full object-contain " alt={prod.name} />
            </div>
            <div className="w-full sm:w-[70%]  h-[100%] flex flex-col justify-between p-4 space-y-2">
                <div>
                    <h3 className="text-lg h-[12%] font-bold mb-4 text-black">{prod.name}</h3>
                    <p className="text-gray-800 h-[8%] mb-1"><span className="font-semibold">original seller:</span> {prod.originalSeller}</p>
                    <p className="text-gray-800 h-[8%] mb-1"><span className="font-semibold">original Price:</span> {prod.originalPrice}</p>
                    <p className="text-gray-800 mb-1 h-[8%]"><span className="font-semibold">offered Price:</span> ₹{prod.price}</p>
                    <p className="text-gray-800 mb-1 h-[8%]"><span className="font-semibold">Offer made by: </span> {prod.offeredBy}</p>
                    {/* <p className="text-gray-800 mb-2 h-[12%]"><span className="font-semibold">Description:</span> {prod.description}</p> */}
                    {sendMode === true ? <div className="flex flex-col sm:flex-row h-[20%] w-full  items-center mt-4 space-x-4">
                        <button className="pl-4 pr-4 p-2 bg-black text-white rounded-xl" onClick={acceptOffer}>Accept offer</button>
                        <button className=" p-2 pl-4 pr-4 bg-black text-white rounded-xl" onClick={rejectOffer}>Reject offer</button>
                        <button className=" p-2 pl-4 pr-4 bg-black text-white rounded-xl" onClick={() => (setN(true))}>Counter offer</button>
                    </div> : <div className="flex h-[20%] w-full justify-center items-center mt-4 space-x-4"> <div><strong>Current status:</strong> {prod.status} </div> </div>}
                </div>
            </div>
        </div> : <div key={index} className="relative flex flex-col  sm:flex-row w-[70%] auto sm:items-center border border-gray-800 rounded-lg shadow-md mb-4 bg-Gld overflow-hidden">
            {/* Status Overlay */}
            <div className="h-[100%] absolute  w-full  text-center text-xl sm:text-4xl font-bold py-2 bg-opacity-75 bg-black text-white flex justify-center items-center">

                {prod.status === "ACCEPTED" && !tra ? (
                    <div>
                        <div className="text-green-300">ACCEPTED</div>
                        <div className="text-green-300 text-xl sm:text-3xl">original seller: <span className="text-sm sm:text-3xl">{prod.originalSeller} </span></div>
                        <div className="text-xl sm:text-3xl text-green-300"> {jwtDecode(localStorage.getItem('token')).email === prod.originalSeller ? <span> Contact: {prod.offeredBy === prod.originalSeller ? prod.offeredTo : prod.offeredBy}</span> : <span>Contact: {prod.offeredBy === prod.originalSeller ? prod.offeredBy : prod.offeredTo} </span>}</div>
                        <div className="text-xl sm:text-3xl text-green-300">Final price: ₹{prod.price}</div>
                    </div>
                ) : (
                    <div>
                        {
                            !tra ?
                                <div className="text-red-500">REJECTED</div>
                                : null
                        }
                    </div>
                )}
            {prod.buyer === jwtDecode(localStorage.getItem('token')).email && tra ? (
                    <div>
                        <div className="text-green-300 text-sm sm:text-2xl">bought from {prod.originalSeller} @₹{prod.price}</div>
                        {/* <div className="text-xl sm:text-3xl text-green-300">Final price: ₹{prod.price}</div> */}
                    </div>
                ) : (
                    <div>
                        {
                            tra  && prod.buyer !== 'none' ?
                            <div>
                            <div className="text-green-300 text-sm sm:text-2xl">sold to {prod.buyer} @₹{prod.price}</div>
                            {/* <div className="text-xl sm:text-3xl text-green-300">Final price: ₹{prod.price}</div> */}
                            </div>
                                : null
                        }
                    </div>


                )}
            </div>

            {/* Card Content */}
            <div className="w-full sm:w-[30%] bg-white h-full flex items-center justify-center p-4 bg-gray-100">
                <img
                    src={prod.image}
                    className="w-full h-full object-contain"
                    alt={prod.name}
                />
            </div>
            <div className="w-full sm:w-[70%] h-full flex flex-col justify-between p-4 space-y-2">
                <div>
                    <h3 className="text-lg h-[12%] font-bold mb-4 text-black">{prod.name}</h3>
                    <p className="text-gray-800 h-[8%] mb-1">
                        <span className="font-semibold">Original Seller:</span> {prod.originalSeller}
                    </p>
                    <p className="text-gray-800 h-[8%] mb-1">
                        <span className="font-semibold">Original Price:</span> {prod.originalPrice}
                    </p>
                    <p className="text-gray-800 mb-1 h-[8%]">
                        <span className="font-semibold">Offered Price:</span> ₹{prod.price}
                    </p>
                    <p className="text-gray-800 mb-1 h-[8%]">
                        <span className="font-semibold">Offer Made By:</span> {prod.offeredBy}
                    </p>
                    {sendMode === true ? <div className="flex flex-col sm:flex-row h-[20%] w-full items-center mt-4 space-x-4">
                        <button
                            className="pl-4 pr-4 p-2 bg-black text-white rounded-xl"
                            onClick={acceptOffer}
                        >
                            Accept Offer
                        </button>
                        <button className="p-2 pl-4 pr-4 bg-black text-white rounded-xl">
                            Reject Offer
                        </button>
                        <button
                            className="p-2 pl-4 pr-4 bg-black text-white rounded-xl"
                            onClick={() => setN(true)}
                        >
                            Counter Offer
                        </button>
                    </div> : null}
                </div>
            </div>
        </div>
        }
        {N === true ? <><div className="fixed inset-0 w-screen h-screen bg-black flex justify-center items-center  bg-opacity-50">
            <div className="w-[40%] h-[30%]  space-x-2 flex justify-center items-center">
                <div className="p-8 bg-Gld space-y-4 rounded-2xl">
                    <div className="h-[25px] w-[100%] relative">
                        <div className="w-[10%] h-[100%]  absolute  right-0 top-0 p-2">
                            <button className="w-[100%] h-[100%]" onClick={() => { setN(false); setEr('') }}>
                                <img src={bsp} alt="" />
                            </button>
                        </div>
                    </div>
                    <div> <span className="font-bold">current offered price: ₹</span>{prod.price}</div>
                    <div className="font-bold">Enter the new price</div>
                    <input type="number" ref={priceRef} className="w-[100%] p-2 border-2 border-black border-solid" />
                    <div className="flex items-center justify-center bg-black p-2 text-white">
                        <button className="w-[100%]" onClick={counter}>Confirm Action</button>
                    </div>
                    <div className="text-red-700">Disclaimer: You will be only able to make this offer once until a counter is made</div>
                    {Er !== '' ? <div className="text-red-700"> {Er} </div> : null}
                </div>
            </div>
        </div>
        </> : null
        }
    </>
    )
}