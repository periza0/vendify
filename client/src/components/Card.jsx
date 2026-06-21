import { useRef, useState } from "react";
import bsp from '../public/sbp.png';
import { jwtDecode } from 'jwt-decode';

export default function Card({ image, price, email, description, name, ids }) {
    const [detail, setDetail] = useState(false);
    const [newP, setNewP] = useState(false);
    const [Er, setEr] = useState('');
    const priceRef = useRef(0);

    async function makeOffer(offerPrice) {
        setEr('');
        if (offerPrice <= 0 || !offerPrice) {
            setEr('Enter a valid offer price');
            return;
        }

        const response = await fetch("https://vendify-backend-service.vercel.app/makeOffer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: jwtDecode(localStorage.getItem('token')).email,
                sellerEmail: email,
                price: offerPrice,
                id: ids
            })
        });

        const res = await response.json();
        if (res.error) {
            setEr(res.error);
        } else {
            setDetail(false);
            setNewP(false);
            setEr('');
        }
    }

    return (
        <>
            <div className="p-4 m-2 h-auto w-[280px] shadow-lg bg-white border border-gray-300 rounded-xl flex flex-col items-center">
                <div className="w-full h-48 flex justify-center items-center">
                    <img src={image} alt="Item" className="object-contain w-3/4 h-full rounded-lg" />
                </div>
                <div className="mt-4 text-center">
                    <div className="text-lg font-semibold truncate">{name}</div>
                    <div className="text-sm text-gray-600 truncate">Sold by: {email}</div>
                    <div className="text-lg font-bold mt-2">₹ {price}</div>
                    <div className="text-sm text-gray-700 mt-2 break-words">{description}</div>
                </div>
                <button 
                    className="mt-4 bg-black text-white py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    onClick={() => setDetail(true)}
                >
                    View Details
                </button>
            </div>

            {detail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg overflow-y-auto">
                        <div className="flex justify-end">
                            <button onClick={() => setDetail(false)}>
                                <img src={bsp} alt="Close" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2 p-4">
                                <img src={image} alt="Item" className="object-contain w-full h-64 rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="mb-4">
                                    <span className="font-bold">Item name: </span>{name}
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold">Sold by: </span>{email}
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold">Description: </span>{description}
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold">Price: </span>₹ {price}
                                </div>
                                {Er && <div className="text-red-500">{Er}</div>}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button 
                                className="bg-black text-white py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
                                onClick={() => makeOffer(price)}
                            >
                                Make Offer at This Price
                            </button>
                            <button 
                                className="bg-black text-white py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
                                onClick={() => { setNewP(true); setEr(''); }}
                            >
                                Negotiate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {newP && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-lg">
                        <div className="flex justify-end">
                            <button onClick={() => setNewP(false)}>
                                <img src={bsp} alt="Close" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold">Current price: ₹</span>{price}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPrice" className="font-bold">Enter the new price:</label>
                            <input 
                                id="newPrice" 
                                type="number" 
                                ref={priceRef} 
                                className="w-full p-2 mt-2 border rounded-lg" 
                            />
                        </div>
                        <button 
                            className="bg-black text-white py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 w-full"
                            onClick={() => makeOffer(priceRef.current.value)}
                        >
                            Confirm Action
                        </button>
                        <div className="text-red-500 mt-4">
                            Disclaimer: You can make this offer only once until a counter offer is made.
                        </div>
                        {Er && <div className="text-red-500 mt-2">{Er}</div>}
                    </div>
                </div>
            )}
        </>
    );
}
