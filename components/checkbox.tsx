import React from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxProps {
    data : string,
    passOption : (data : string) => void
}

export const CheckboxOption : React.FC<CheckboxProps>  = ({data, passOption}) => {
    
    return(
        <div className="items-top flex space-x-2">
            <Checkbox onClick={() => passOption(data)} id={`${data}`} />
            <div className="grid gap-1.5 leading-none">
            <label
                htmlFor={`${data}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {data}
            </label>
            </div>
        </div>
    )
}