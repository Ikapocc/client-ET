import Image from "next/image";
import React from "react";
import arrow from "@/public/images/shared/desktop/icon-arrow-right.svg"

interface LinkToProductsProps {
    image : string | any
    title : string
}

export const LinkToProducts : React.FC<LinkToProductsProps> = ({image, title}) => {
    return(
        <section>
            <div className="grid text-center gap-3">
                <Image src={image} alt={`${title} photo info`} width={220} height={200}></Image>
                <h2 className="text-lg text-black font-bold">{title}</h2>
                <span className="flex items-center justify-center gap-2 text-orange-500">SHOP<Image src={arrow} alt="arrow shop"></Image> </span>
            </div>
        </section>
    )
}
