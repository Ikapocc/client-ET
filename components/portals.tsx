"use client"

import React, { PropsWithChildren } from "react";
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export const Portals : React.FC<PropsWithChildren> = ({children}) => {
    const [mounted, setMounted] = useState<HTMLElement | null>(null)
    const [isMonted, setIsMonted] = useState<boolean>(false)

    useEffect(() => {
        const portalElement = document.createElement("section")
        const childs = document.getElementById("portal")
            
        if (childs) {
            document.body.insertAdjacentElement("afterbegin", portalElement)
        }else{
            document.body.appendChild(portalElement)
        }
        setMounted(portalElement)
        setIsMonted(true)

        return () => {
            document.body.removeChild(portalElement)
        }

    }, [])

    if (!mounted || !isMonted) return null

    return createPortal(children, mounted)
}