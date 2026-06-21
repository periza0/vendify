import { useState } from "react"
import bsp from '../public/sbp.png';
export default function EditForm({editForm, email ,setEditForm, price, name, description, id}){
    const [Name, setName] = useState(name)
    const [Description, setDescription] = useState(description)
    const [Price, setPrice] = useState(price)
    async function changeValue() {
        const response = await fetch("https://vendify-backend-service.vercel.app/userListings", {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email: email,
                id: id,
                price: Price,
                name : Name,
                description: Description
            })
        })
        const res = await response.json();
        if(res.success){
            setEditForm(false)
            location.reload()
        }
    }
    return (
        <>
        {editForm === true ? <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="w-[60%] sm:w-[30%] p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="h-[30px] w-[100%] relative ">
                <div className="h-[100%] w-[15%] absolute right-0 top-0 flex justify-center  items-center">
                    <button className="w-[60%] h-[60%]" onClick={() => (setEditForm(false))}>
                        <img src={bsp} className="w-[100%] h-[100%]" />
                    </button>
                </div>
            </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={Name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                        onChange={(e) => (setName(e.target.value))}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={Description}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                        onChange={(e) => (setDescription(e.target.value))}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={Price}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                        onChange={(e) => (setPrice(e.target.value))}
                    />
                </div>
                <div className="text-center">
                    <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition" onClick={changeValue}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div> : null}
        </>
    )
}