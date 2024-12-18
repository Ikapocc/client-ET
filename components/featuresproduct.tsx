import Image from "next/image";
import React from "react";
import { MoreInfo } from "./moreinfobutton";
import waves from "@/public/images/home/desktop/pattern-circles.svg";

interface FeaturesProductProps {
    sectionClass : string,
    title : string,
    description : string,
    buttonTitle : string,
    colorButton : string,
    directionButton : string
    image : string | any
}

export const FeaturesProduct : React.FC<FeaturesProductProps> = ({colorButton, description, directionButton, sectionClass, title, buttonTitle, image}) => {
    return(
        <section className={`${sectionClass} lg:flex justify-center overflow-hidden items-center rounded-xl 
            max-lg:grid max-lg:text-center max-lg:justify-items-center bg-[url(/images/home/desktop/pattern-circles.svg)] bg-no-repeat bg-contain bg-[position:10px_-20px]`}>

          <Image className={`relative top-[5rem] max-lg:w-2/5`} src={image} alt="speaker logo" height={400} width={455}></Image>

          <div className="flex flex-col gap-14 mx-6">
            <h1 className="text-7xl font-bold text-white">{title}</h1>
            <p className="text-gray-200 text-lg leading-8">{description}</p>
            <MoreInfo text={buttonTitle} propsButton={colorButton} direction={directionButton} />
          </div>
        </section>
    )
}