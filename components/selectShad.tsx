import {
    SelectItem,
  } from "@/components/ui/select"
import React from "react"

interface optsProps {
    name : string,
}

export const SelectShad : React.FC<optsProps> = ({name}) => {
        
    return(
        <>
            <SelectItem className="max-lg:text-[0.7rem]" value={name}>{name}</SelectItem>
        </>
    )
  }