import React, { PropsWithChildren } from "react";


export const DialogSizes : React.FC<PropsWithChildren> = ({children}) => {
    
    return(
        <div className={`grid grid-cols-12 items-center`}>
            {children}
        </div>
    )
}