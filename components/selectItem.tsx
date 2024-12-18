import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectShad } from "./selectShad";

interface SelectGroups<T> {
    arr : T[],
    title : string,
}

export const SelectGroupItems = <T, >({arr, title} : SelectGroups<T>) : React.FC<SelectGroups<T>> => {
    return(
        <Select name={title}>
            <SelectTrigger className="col-span-5 max-sm:col-span-12 text-left text-xs">
                <SelectValue className="" placeholder="Select a category option"></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="max-lg:text-[0.7rem]">Options</SelectLabel>
                    {arr.map((items, id) => (
                        <SelectShad key={id} name={items}/>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}