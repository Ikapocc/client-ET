"use client"

import { AudioStore } from "@/app/store/audioStore2";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export interface ProductProps {
    _id:          string;
    product_name: string;
    category:     string;
    price:        number;
    image_url:    string[];
    stock:        number;
    sku:          string;
    thumbnail:    string;
    description:  string;
    createBy:     string;
    createdAt:    Date;
    __v:          number;
}

async function GettingProductById(id : string, category : string, token : string) : Promise<ProductProps> {
    const data = await fetch(`http://localhost:4000/api/user/${category}/${id}`, 
        {
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    )
    const productData = await data.json()
    return productData
}

export default function DynamicPage() {
    const params = useParams<{category : string, id : string}>()
    const [quantity, setQuantity] = useState<number>(1)

    const {addProduct, user_token} = AudioStore(state => state)

    const {data, isFetching, isLoading} = useQuery({
        queryKey : ["productData"],
        queryFn : () => GettingProductById(params.id, params.category, user_token)
    })

    if (isFetching || isLoading) return <div>...Loading</div>

    return (
        <section className="flex flex-col">
            <section className="flex flex-col text-black gap-20">
                <Link className="text-xl text-gray-500" href={"/"}>Ir atras</Link>

                <section className="lg:flex flex-row lg:gap-[5rem] max-lg:grid items-center">
                    <Image className={`${data?.category === "smartphones" ? "w-[20%]" : ""}`} src={data!.image_url[0]} width={500} height={200} alt="Image product"/>

                    <div className="flex flex-col justify-center gap-12 max-lg:items-center max-lg:text-center">
                        <span className="text-orange-500 text-lg tracking-[0.8rem]">NEW PRODUCT</span>
                        <h2 className="text-5xl font-extrabold">{data?.product_name.toUpperCase()}</h2>
                        <p className="text-lg text-gray-500">{data?.description}</p>

                        <p className="text-2xl font-bold">{data?.price.toLocaleString("en-US", {style : "currency", currency: "USD"})}</p>

                        <div className="flex gap-10 text-xl items-center">
                        <button onClick={() => setQuantity(quantity => quantity + 1)} className="hover:text-orange-500">+</button>{<h3 className="font-semibold">{quantity}</h3>}<button className="hover:text-orange-500" onClick={() => setQuantity(quantity => quantity > 2 ? quantity - 1 : 1)}>-</button>
                        <button onClick={() => addProduct({id: data!._id, image: data!.thumbnail, price : data!.price, quantity : quantity, title : data!.product_name})}
                                className="bg-orange-500 text-white px-8 py-4 font-medium text-base">ADD TO CART</button>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}