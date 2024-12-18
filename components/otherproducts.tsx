import Image from "next/image";
import React from "react";
import { MoreInfo } from "./moreinfobutton";

interface OtherProductsProps {
    image: string;
    title : string;
    link : string;
}

export const OtherProducts : React.FC<OtherProductsProps> = ({image, link, title}) => {

    return(
        <section className="grid gap-2 justify-items-center	">
            <Image src={image} width={250} height={500} alt="products"/>
            <div className="flex flex-col gap-8 justify-center">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <MoreInfo direction={link} text={"SEE PRODUCT"} propsButton={"bg-orange-500 text-white px-8 py-3"} />
            </div>
        </section>
    )
}