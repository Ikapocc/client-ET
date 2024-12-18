import {create} from "zustand"

interface AudiophileProductProp {
    id : number
    name_product : string
    price : number
    quantity : number
}

interface CartProps {
    productsInCart : AudiophileProductProp[]
    addItem : (product : AudiophileProductProp) => void
    removeAllItems : () => void
    removeItem : (id : number) => void
    /*increaseQuantity : (id : number) => void
    decreaseQuantity : (id : number) => void */
    totalPrice : number
}

export const CartStore = create<CartProps>((set) => ({
    productsInCart : [],
    totalPrice : 0,
    addItem : (product) => set((state) => {
        const isItemInCart = state.productsInCart.find(items => items.id === product.id)
        let productItem;
        
        if (isItemInCart) {
            productItem = state.productsInCart.map(items => (
                items.id === product.id ? 
                {...items, quantity : items.quantity + product.quantity} 
                : items
            ))
        } else {
            productItem = [...state.productsInCart, product]
        }

        return {
            productsInCart : productItem,
            totalPrice : GettingFullPrice(productItem)
        }
    }),
    removeAllItems : () => set({productsInCart : [], totalPrice : 0}),
    removeItem : (id) => set((state) => {

        const filterCart = state.productsInCart.filter(items => items.id !== id)
        return {
            productsInCart : filterCart,
            totalPrice : GettingFullPrice(filterCart)
        }
    })
}))

function GettingFullPrice(data : AudiophileProductProp[]) {
    return data.reduce((acc, cur) => {
        return acc + (cur.price * cur.quantity)
    }, 0)
}