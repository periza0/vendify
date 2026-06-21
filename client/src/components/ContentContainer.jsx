import { useEffect, useState } from "react"
import Skeleton from "./Skeleton";
import Card from "./Card";
import im2 from '../public/im2.png'
export default function ContentContainer() {
    const [loader, setLoader] = useState(true);
    const [prods, setprods] = useState([]);
    const [open, setOpen] = useState(false);
    const [showPriceSlider, setsps] = useState(false)
    function toggle() {
        setOpen((prev) => (!prev))
    }

    function sortLow() {
        const sortedProds = [...prods].sort((a, b) => (a.price - b.price));
        setprods(sortedProds);
    }

    function sortHigh() {
        const sortedProds = [...prods].sort((a, b) => b.price - a.price);
        setprods(sortedProds);
    }

    useEffect(() => {
        setLoader(true)
        async function getItem() {
            try {
                const response = await fetch('https://vendify-backend-service.vercel.app/listing', {
                    method: "GET"
                })
                const itemsArray = await response.json();
                if (!itemsArray.products) throw new Error("something went wrong")
                else {
                    setprods(itemsArray.products)
                    // console.log(itemsArray.products[0]._id)
                    setLoader(false)
                }
            } catch (e) {

            }
        }
        getItem()

    }, [])

    useEffect(() => {

        async function getItem() {
            try {
                if(open === false){
                const response = await fetch('https://vendify-backend-service.vercel.app/listing', {
                    method: "GET"
                })
                const itemsArray = await response.json();
                if (!itemsArray.products) throw new Error("something went wrong")
                else {
                    setprods(itemsArray.products)
                }
            }
            } catch (e) {

            }
        }
        const interval = setInterval(() => {
            getItem()
        }, 10000);
        return () => clearInterval(interval)

    }, [])
    return (
        <div className="bg-Gld rounded-2xl ">
            {loader === false ? <div className="w-[100%] bg-Gld h-[32px]">
                <button className="ml-8  mb-4" onClick={toggle}>
                    <img src={im2} className="h-[20px]" />
                </button>
                {open === true ? <div className="z-50 ">
                    <div className="absolute mb-2 z-50 rounded-xl bg-white p-2 p-[1px] m-2">
                        <div className="p-2  hover:bg-gray-200">
                            <button className="z-40 " onClick={sortLow}> Sort price: Low to high</button>
                        </div>
                        <div className="p-2  hover:bg-gray-200">
                            <button className="z-40 " onClick={sortHigh}>Sort price: High to low</button>
                        </div>
                        
                    </div>
                </div> : null}
            </div> : null}
            <div className="flex flex-wrap p-4  border-2 border-solid border-black w-[100%] bg-Gld mt-4 space-x-3 justify-center h-[400px] overflow-y-auto items-center place-items-start rounded-2xl relative">
                {loader === true ? Array.from({ length: 8 }, (product, index) => (<Skeleton key={product} />)) : prods.map((prods, index) => (<div><Card image={prods.image} email={prods.soldBy} price={prods.price} name={prods.name} description={prods.description} ids={prods._id} /></div>))}
            </div>
        </div>
    )
}