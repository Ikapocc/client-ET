"use client"

import { AudioStore, ProductAudioProps } from "@/app/store/audioStore2"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface newDataProps {
    user_id : string,
    productProps : ProductAudioProps[]
}

async function sendNewOrder(data :newDataProps,token : string) {
        
    await fetch("http://localhost:4000/api/user/create-new-order", 
        {
            method : "POST",
            body : JSON.stringify({
                data
            }),
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    )
}

export default function Checkout() {
    const {cart, userInfo, user_token} = AudioStore(state => state)

    const prices = cart.length > 0 ? cart.map(items => items.price * items.quantity).reduce((acc, curr) => {
        return acc + curr
    }) : 0

    const shipping = cart.length * 25
    const per = Math.floor(prices * (20 / 100))
    const total = prices + shipping + per

    async function handleFormData(e : React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const orderData = {
            user_id : userInfo!._id,
            orders : cart.map(items => {
                return {
                    id : items.id,
                    product_name : items.title,
                    category : items.category,
                    price : items.price,
                    stock : items.stock,
                    sku : items.sku,
                    description : items.description,
                    createBy : items.createBy,
                    quantity : items.quantity
                }
            })
        }
        sendNewOrder(orderData, user_token);
        
        /* await sendNewOrder(orderData, user_token); */
    }

    return(
        <article className="flex flex-col gap-16 w-full">
            <Link className="text-xl text-gray-500" href={`/`}>Go back</Link>

            <form className="flex w-full" method="post" onSubmit={handleFormData}>
                <section className="w-[80%] flex flex-col gap-16">
                    <p className="text-orange-500 font-semibold tracking-[0.2rem]">BILLING DETAILS</p>
                            
                    <div className="md:flex gap-4">
                        <label>Name
                            <input type="text" value={userInfo?.user_name} name="name" id="name" placeholder="Your name here" required />
                        </label>
                                    
                        <label>Email
                            <input type="email" name="email" value={userInfo?.email} id="email" placeholder="Your email here" required />
                        </label>
                    </div>
    
                    <p className="text-orange-500 font-semibold tracking-[0.2rem]">SHIPPING INFO</p>
    
                    <div className="grid gap-8">
                        <label>Your Address
                            <input className="md:w-3/5" type="text" value={userInfo?.address.address} name="address" id="address" placeholder="Your address here" required />
                        </label>
                                        
                        <div className="md:flex gap-4">
                            <label>ZIP Code
                                <input type="text" name="zip" id="zip" value={userInfo?.address.postalCode} placeholder="Your zip here" required />
                            </label>
                                            
                            <label>City
                                <input type="text" name="city" id="city" value={userInfo?.address.city} placeholder="Your city here" required />
                            </label>
                        </div>
                                        
                        <label>Country
                            <input className="md:w-3/5" type="text" name="country" id="country" value={userInfo?.address.state} placeholder="Your country here" required />
                        </label>
                    </div>
                </section>

                <div className="grid gap-10 md:h-24">
                    <h2 className="text-2xl font-semibold">SUMMARY</h2>

                    <div className="flex flex-col gap-8">
                        {cart.length > 2 ? cart.slice(0,2).map(items => (
                            <div className="flex gap-4" key={items.id}>
                                <Image className="object-contain" src={items.image} alt="Image product" width={100} height={100} />
                                <div className="flex gap-16 items-center">
                                    <div className="grid gap-6">
                                        <p className="font-semibold text-gray-600">
                                            {items.price.toLocaleString("en-US", {style: "currency", currency: "USD"})}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gray-600 text-lg">x{items.quantity}</p>
                                </div>
                            </div>
                        )) : cart.map(items => (
                            <div className="flex gap-4" key={items.id}>
                                <Image className="object-contain" src={items.image} alt="Image product" width={100} height={100} />
                                <div className="flex gap-16 items-center">
                                    <div className="grid gap-6">
                                        <p className="font-semibold text-gray-600">
                                            {items.price.toLocaleString("en-US", {style: "currency", currency: "USD"})}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gray-600 text-lg">x{items.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ul className="flex flex-col font-semibold text-zinc-500 gap-6">
                        <li>TOTAL: {prices.toLocaleString("en-US", {style: "currency", currency: "USD"})}</li>
                        <li>SHIPPING: {shipping.toLocaleString("en-US", {style: "currency", currency: "USD"})}</li>
                        <li>VAT(INCLUDED): {per.toLocaleString("en-US", {style: "currency", currency: "USD"})}</li>
                        <li>GRAND TOTAL: {total.toLocaleString("en-US", {style: "currency", currency: "USD"})}</li>
                    </ul>

                    <button type="submit" className="bg-orange-500 font-semibold p-5 text-white text-xl">
                        Continue and pay
                    </button>
                </div>
            </form>

        </article>
    )
}