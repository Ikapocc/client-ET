import Image from "next/image";
import React from "react";
import { MoreInfo } from "./moreinfobutton";

interface ProductInfoProps {
    image : string,
    title : string, 
    text : string 
    propsDiv : string 
    slugRedirect : string
}

export const ProductInfo : React.FC<ProductInfoProps> = ({image, propsDiv, slugRedirect, text, title}) => {
    
    return (
        <section className={`${propsDiv} flex items-center justify-center lg:gap-28 max-lg:grid max-lg:text-center`}>
            <Image src={image} alt="image product" width={575} height={150} />
            <div className={`${propsDiv} flex flex-col gap-7`}> 
                <span className="text-orange-500 text-lg tracking-[0.8rem]">NEW PRODUCT</span>
                <h1 className="font-semibold lg:text-6xl max-lg:text-3xl text-black">{title.toUpperCase()}</h1>
                <p className="lg:text-lg max-lg:text-base text-gray-500">{text}</p>
                <MoreInfo text={"SEE PRODUCT"} propsButton={"bg-orange-500 text-white px-7 py-4"} direction={slugRedirect}/>
            </div>
        </section>
    )
}
