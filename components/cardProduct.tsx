import { ProductProps } from "@/app/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AllProductsProps {
    allProdiucts : ProductProps[] | undefined,
    gettingDataProduct : (data : ProductProps) => void
}

export const IndividualItems : React.FC<AllProductsProps> = ({allProdiucts, gettingDataProduct}) => {
    
    return(
        <ul className="grid grid-cols-5 gap-16">
            {allProdiucts?.map(items => 
            <li className="flex flex-col relative gap-8" key={items._id}>
                <Link className="h-full" href={`/pages/${items.category}/${items.sku}`}>
                    <Image className="object-cover" src={items.thumbnail} height={450} width={450} alt={`${items.product_name} image`}/>
                    <div className="flex flex-col justify-end">
                        <h1 className="text-lg font-bold">{items.product_name}</h1>
                        <p className="text-gray-700">{items.price}</p>
                    </div>
                </Link>
                <button onClick={() => gettingDataProduct(items)} className="bg-red-700 w-full py-3 text-white font-semibold text-lg rounded-2xl">Agregar</button>
            </li>
            )}
        </ul>
    ) 
}