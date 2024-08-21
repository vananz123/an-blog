import React from "react"


export const Containner =({children}:{children:React.ReactNode} , className?:string)=>{
    return (
        <div className={`pl-20 pr-20 ${className}`}>
            {children}
        </div>
    )
}