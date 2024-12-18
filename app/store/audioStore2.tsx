import {create} from "zustand"
import { Address } from "../type.d.ts"

export interface ProductAudioProps{
    id : string
    title : string
    image? : string
    price : number
    quantity : number
    category: string
    stock: number
    sku: string
    description: string
    createBy: string
}

interface userInfo {
    _id? : string
    user_name : string
    user_last_name : string
    address : Address
    nickname : string
    email : string
    rol : string
}

interface StoreProps {
    userInfo : userInfo | null
    isUserLog : boolean
    user_token : string
    cart : ProductAudioProps[]
    totalPrice : number
    setUserToken : (token : string) => void
    setUser : (user : userInfo) => void
    addProduct : (product : ProductAudioProps) => void
    removeAllItems : () => void
    removeItem : (id : string) => void
    increaseQuantity : (id : string) => void
    decreaseQuantity : (quantity : string) => void
}

export const AudioStore = create<StoreProps>((set) => ({
    userInfo : null,
    isUserLog : false,
    user_token : "",
    cart : [],
    totalPrice : 0,
    setUserToken : (token) => set({isUserLog : true, user_token : token}),
    setUser : (user) => set({userInfo : user}),
    addProduct : (product) => set((state) => {
        const isProductInCart = state.cart.find(items => items.id === product.id)
        let newItem;

        if (isProductInCart) {
            newItem = state.cart.map(items => (
                items.id === product.id ? {...items, quantity : product.quantity + items.quantity} : items
            ))

        } else {
            newItem = [...state.cart, product]
        }

        return {
            cart : newItem,
            totalPrice : FullPrice(newItem)
        }
    }),
    removeAllItems : () => set({cart : [], totalPrice : 0}),
    removeItem : (id)  => set((state) => {

        const filterData = state.cart.filter(items => items.id !== id)

        return {
            cart : filterData,
            totalPrice : FullPrice(filterData)
        }
    }),
    increaseQuantity : (id) => set((state) => {
        const increaseItem = state.cart.map(items => (
            items.id === id ? {...items, quantity : items.quantity + 1} : items
        ))

        return {
            cart : increaseItem,
            totalPrice : FullPrice(increaseItem)
        }
    }),
    decreaseQuantity : (id) => set((state) => {
        const increaseItem = state.cart.map(items => (
            items.id === id ? {...items, quantity : items.quantity - 1} : items
        ))

        return {
            cart : increaseItem,
            totalPrice : FullPrice(increaseItem)
        }
    })
}))

function FullPrice(data : ProductAudioProps[]) {
    if (data.length === 0) return 0

    return data.reduce((acc, cur) => {
        return acc + (cur.quantity * cur.price)
    }, 0)
}