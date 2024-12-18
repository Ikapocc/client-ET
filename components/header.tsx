"use client"

import Image from "next/image"
import logo from "/public/images/shared/desktop/logo.svg"
import hamburger from "/public/images/shared/tablet/icon-hamburger.svg"
import cartImage from "/public/images/shared/desktop/icon-cart.svg"
import Link from "next/link"
import { AudioStore } from "@/app/store/audioStore2"
import { useState } from "react"
import { Popover } from "./ui/popover"
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { SubmitHandler, useForm } from "react-hook-form"
import { DialogAddPost } from "./newProduct"

interface FormProps {
    email : string,
    password : string
}

export default function Header() {

    const {cart, removeAllItems, increaseQuantity, decreaseQuantity, totalPrice, user_token, setUserToken, isUserLog, setUser, userInfo} = AudioStore(state => state)
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const {register, handleSubmit} = useForm<FormProps>()

    const onSubmit : SubmitHandler<FormProps> = async (data) => {
        const {email, password} = data
        try {
            const response  = await fetch("http://localhost:4000/api/auth/login", {
                method : "POST",
                headers : {
                    "Authorization" : `Bearer ${user_token}`,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    userMail : email, 
                    password : password
                })
            })
            
            if (response.ok) {
                const tokenResponse = await response.json()
                localStorage.setItem("token", tokenResponse.access_token)
                setUserToken(tokenResponse.token.access_token)
                setUser(tokenResponse.user)
                console.log(userInfo);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
        
    }

    return(
        <header className="lg:px-36 py-12 text-white bg-bg-original max-lg:px-8">
            <nav className="flex justify-between items-center">
                <button className="lg:hidden"><Image src={hamburger} alt="hamburger page"></Image></button>
                <Link href={"/"}><Image src={logo} alt="page logo"></Image></Link>
                <section className="flex items-center gap-14">
                    {userInfo?.rol === "admin" ? 
                        <Link href={"/pages/dashboard"}>
                            <button className="border-2 border-white py-4 px-6 rounded-xl">Dashboard</button>
                        </Link> : <></>
                    }
                    {userInfo?.rol === "admin" ? 
                        <DialogAddPost /> : <></>
                    }
                    {!isUserLog ? <Popover>
                        <PopoverTrigger className="border-2 border-white py-3 px-5 text-sm rounded-2xl">
                            Iniciar sesion
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-8 bg-white z-50 text-black px-4 py-6 rounded-xl border-2 border-black">
                            <p className="w-full flex justify-center">Sign up</p>
                            <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-8">
                                    <label className="w-full">Email</label>
                                    <input {...register("email")} className="border-2 border-black" name="email"></input>
                                </div>
                                <div className="flex gap-8">
                                    <label className="w-full">Password</label>
                                    <input {...register("password")} className="border-2 border-black" name="password"></input>
                                </div>
                                <button className="w-full font-bold bg-slate-200">Submit</button>
                            </form>
                        </PopoverContent>
                    </Popover> : <h1>Welcome {userInfo?.nickname}</h1>}
                    <Popover>
                        <PopoverTrigger onClick={() => setIsCartOpen(!isCartOpen)} className="border-2 border-white py-3 px-5 text-sm rounded-2xl">
                            <Image src={cartImage} alt="cart"/>
                        </PopoverTrigger>
                        <PopoverContent className={`bg-white text-black border-2 border-black top-[9rem] z-30 right-[2rem] rounded-xl flex flex-col gap-6 ease-in-out text-[.9rem] py-5 px-4 `}>
                        <section>
                            <div className="flex justify-between">
                                <p>Cart</p>
                                <button onClick={() => removeAllItems()}>Remove All</button>
                            </div>

                            {cart.length > 0 ? <ul className="flex flex-col gap-2 justify-between">
                                {cart.map(items => (
                                    <li className="flex justify-between" key={items.id}>
                                        <section className="flex items-center gap-3">
                                            <Image src={items.image} alt="Item image" width={50} height={100}/>
                                            <div className="text-xs flex flex-col gap-2">
                                                <p>{items.title}</p>
                                                <p>{items.price}</p>
                                            </div>
                                        </section>
                                        <section className="flex gap-6 justify-center items-center text-sm pl-48 py-8">
                                            <button onClick={() => increaseQuantity(items.id)}>+</button>
                                            <span>{items.quantity}</span>
                                            <button onClick={() => decreaseQuantity(items.id)}>-</button>
                                        </section>
                                    </li>     
                                ))}
                            </ul> : <div className="px-24 py-16">No items in cart....</div>}

                            <section className="flex justify-between">
                                <p>Total</p>
                                <p className="text-black">{totalPrice}</p>
                            </section>
                            <Link href={"/pages/checkout"}>
                                <button className="text-lg font-bold bg-orange-400 w-full my-6 py-2 text-white rounded-lg">Check Out</button>
                            </Link>
                        </section>
                        </PopoverContent>
                    </Popover>
                    
                </section>
            </nav>
        </header>
    )
}