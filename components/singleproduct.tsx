"use client"

import { SingleProductProps } from "@/app/type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { OtherProducts } from "./otherproducts";
import Products from "./products";
import AudioAd from "./guyAd";
import { AudioStore } from "@/app/store/audioStore2";

export const SingleProduct : React.FC<SingleProductProps> = ({data}) => {
    const [quantity, setQuantity] = useState(1)
    const {cart, addProduct, removeAllItems, removeItem} = AudioStore(state => state)
    console.log(cart);
    
    return (
        <section className="flex flex-col gap-56">
            {data.map(itemsData => (
                <section className="flex flex-col text-black gap-24" key={itemsData.id}>
                    <Link className="text-xl text-gray-500" href={`/pages/${itemsData.category}`}>Go back</Link>

                    <section className="lg:flex flex-row lg:gap-[5rem] max-lg:grid">
                        <Image src={itemsData.images[0].url} width={700} height={500} alt="Image product"/>

                        <div className="flex flex-col justify-center gap-12 max-lg:items-center max-lg:text-center">
                            <span className="text-orange-500 text-lg tracking-[0.8rem]">NEW PRODUCT</span>
                            <h2 className="text-5xl font-extrabold">{itemsData.name.toUpperCase()}</h2>
                            <p className="text-lg text-gray-500">{itemsData.description}</p>

                            <p className="text-2xl font-bold">{itemsData.price.toLocaleString("en-US", {style : "currency", currency: "USD"})}</p>
                            <div className="flex gap-10 text-xl items-center">
                                <button onClick={() => setQuantity(quantity => quantity + 1)} className="hover:text-orange-500">+</button>{<h3 className="font-semibold">{quantity}</h3>}<button className="hover:text-orange-500" onClick={() => setQuantity(quantity => quantity > 2 ? quantity - 1 : 1)}>-</button>
                                <button onClick={() => addProduct({id: itemsData.id, image: itemsData.images[0].url, price : itemsData.price, quantity : quantity, title : itemsData.name})}
                                className="bg-orange-500 text-white px-8 py-4 font-medium text-base">ADD TO CART</button>
                                <button onClick={() => removeAllItems()}>Remover todo</button>
                                <button onClick={() => removeItem(itemsData.id)}>Remover item</button>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="lg:flex gap-16 max-lg:grid max-lg:items-center">
                            <div className="flex flex-col w-8/12 gap-10">
                                <h2 className="lg:text-4xl max-lg:text-3xl max-md:text-2xl font-bold">FEATURES</h2>
                                <p className="lg:text-lg max-lg:text-base text-gray-500 leading-loose pr-20">{itemsData.features}</p>
                            </div>

                            <div className="flex flex-col gap-10">
                                <h2 className="lg:text-4xl max-lg:text-3xl max-md:text-2xl font-bold">IN THE BOX</h2>
                                    <ul className="flex flex-col gap-4">
                                        {itemsData.includes_product.map(items => (
                                            <li className="flex gap-4 lg:text-lg max-lg:text-base" key={items.id}>
                                                <p className="text-orange-500 font-bold">{items.quantity}x</p>
                                                <p>{items.item}</p>
                                            </li>
                                        ))}
                                    </ul>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-12 w-[90%]">
                        <div className="col-span-6 ">
                            {itemsData.gallery.map(itemsGallery => (
                                <>
                                    {itemsGallery.typeorder === "first" || itemsGallery.typeorder === "second" ? 
                                    <Image src={itemsGallery.url.tablet} 
                                    width={500} height={450} alt={`${itemsGallery.typeorder.tablet} image`}/> : <></>}
                                </>
                            ))}
                        </div>

                        <div className="col-span-6">
                            {itemsData.gallery.map(itemsGallery => (
                                <>
                                    {itemsGallery.typeorder === "thrid" ? 
                                    <Image className="w-full max-h-full" src={itemsGallery.url.tablet} 
                                    width={700} height={300} alt={`${itemsGallery.typeorder} image`}/> : <></>}
                                </>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col text-center gap-20">
                        <h2 className="text-4xl font-bold">YOU MAY ALSO LIKE</h2>
                        
                        <section className="lg:flex gap-6 lg:justify-between max-lg:grid max-lg:justify-center items-center">
                            {itemsData.others!.map((items, id) => (
                                <OtherProducts key={id} image={items.images[0].url} link={items.slug} title={items.name}/>
                            ))}
                        </section>
                    </section>
                </section>)
            )}
            <Products />
            <AudioAd />
        </section>
    )
}