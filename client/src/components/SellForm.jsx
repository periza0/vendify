import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import bsp from '../public/sbp.png'
export default function SellForm() {
    const fileRef = useRef(null);
    const descriptionRef = useRef("");
    const priceRef = useRef(0);
    const nameRef = useRef("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("token");
            if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
                navigate("/signup");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [navigate]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://vendify-backend-service.vercel.app/postListing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: jwtDecode(localStorage.getItem("token")).email,
                    price: priceRef.current.value,
                    description: descriptionRef.current.value,
                    image: fileRef.current,
                    name: nameRef.current.value,
                }),
            });

            const result = await response.json();
            if (!result.error) {
                setIsSuccessful(true);
                setErrorMessage("");
            } else {
                setErrorMessage(result.error);
            }
        } catch (error) {
            setErrorMessage("An error occurred while submitting the listing. Please try again.");
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            fileRef.current = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-yellow-500">
            <Header />
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-12"
            >
                <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-6">
                    Create a New Product Listing
                </h2>
                {errorMessage && (
                    <div className="mb-4 p-4 text-yellow-700 bg-yellow-200 border border-yellow-400 rounded-lg">
                        {errorMessage}
                    </div>
                )}
                {isSuccessful && (
                    <div className="mb-4 p-4 text-green-700 bg-green-200 border border-green-400 rounded-lg">
                        Listing created successfully!
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-yellow-300 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        required
                        ref={nameRef}
                        placeholder="Enter product name"
                        className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-yellow-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-300 font-medium mb-2">Description</label>
                    <input
                        type="text"
                        required
                        ref={descriptionRef}
                        placeholder="Enter product description"
                        className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-yellow-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-yellow-300 font-medium mb-2">Price</label>
                    <input
                        type="number"
                        required
                        ref={priceRef}
                        placeholder="Enter price"
                        className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-yellow-200"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-yellow-300 font-medium mb-2">Product Image</label>
                    <input
                        type="file"
                        required
                        onChange={handleFileChange}
                        className="w-full text-yellow-300 bg-gray-800"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                    Submit Listing
                </button>
            </form>
        </div>
    );
}
