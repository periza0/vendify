import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ListCard from "./ListCard";
import { useNavigate } from "react-router-dom";
import Header from './Header'
export default function Listing({edit}) {
    const [pdcts, setPdcts] = useState([]);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if(!token || (jwtDecode(token).exp*1000 < Date.now())) Navigate('/signup')
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        setLoading(true);
        async function getLists() {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const response = await fetch('https://vendify-backend-service.vercel.app/userListings', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: decodedToken.email })
                });
                const prods = await response.json();
                setPdcts(prods.products);
                setLoading(false);
            } catch (e) {
                console.error("Error fetching listings:", e);
                setLoading(false);
            }
        }
        getLists();
    }, []);

    return (
        <div className="bg-black">
            <div>
            <Header />
            </div>
            <div className="w-[80%] mx-auto m-4 bg-black">
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : (
                    pdcts.map((product, index) => (
                        <ListCard 
                            edit = {edit}
                            key={index}
                            image={product.image} 
                            index={index} 
                            name={product.name} 
                            price={product.price} 
                            sold={product.sold} 
                            id={product._id}
                            email={product.soldBy}
                            description={product.description}
                            status={product.status}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
