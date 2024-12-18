import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react";
import { Textarea } from "@/components/ui/textarea"
import { DialogSizes } from "./DialogSizes";

interface CreateInputProps{
    input_name : string,
    title : string,
    typeOfElement : "input" | "textArea"
    defaultTitle? : string,
    defaultDescription? : string
}

export const CreateInputAndTextArea : React.FC<CreateInputProps> = ({input_name, title, typeOfElement, defaultDescription, defaultTitle}) => {
    return(
        <DialogSizes>
            <Label htmlFor={input_name} className="col-span-5 max-sm:col-span-12 max-lg:text-xs text-[0.80rem] max-sm:mb-4 text-left">
                {title}
            </Label>
            {typeOfElement === "input" ? <Input defaultValue={defaultTitle ? defaultTitle : ""} name={input_name} id={input_name} placeholder="Add a short and a descriptive title" className="col-span-7 max-lg:text-xs max-sm:col-span-12 text-left"/>
            : <Textarea defaultValue={defaultDescription ? defaultDescription : ""} className="col-span-7 max-sm:col-span-12 resize-none max-lg:text-xs text-left" name={input_name} placeholder="Include any specific comments on what should be improved, added, etc"/>}
        </DialogSizes>
    )
}