import React from "react"


export const Containner =({children , className}:{children:React.ReactNode ; className?:string})=>{
    const maxWidth = `w-11/12 max-w-screen-lg ${className}`
    return (
        <div className='grid grid-cols-1 justify-items-center'>
           <div className={maxWidth}> {children}</div>
        </div>
    )
}