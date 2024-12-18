import Link from "next/link";
import React from "react";

interface MoreInfoProps {
    propsButton : string, 
    text : string,
    direction : string
}

export const MoreInfo : React.FC<MoreInfoProps> = ({direction, propsButton, text}) => {
    return (
        <section>
            <Link href={`/pages/product/${direction}`}>
                <button className={`${propsButton} font-medium text-base rounded-lg`}>
                    <h2>{text}</h2>
                </button>
            </Link>
        </section> 
    )
}