import * as React from "react"

const ErrorMessage: React.FC<{message: string,className?:string,textClassName?:string,error?:boolean}>=({message,className,textClassName,error})=>(
    <div className={`${className?className:"px-1  py-3"} flex items-center justify-start mx-auto w-full  bg-red-50 border border-t-red-400 border-t-2 txt-red-700  rounded-2xl shadow-md shadow-enhancedMediumBlack relative`}>
        <div className="flex items-center">
           {!error&& <span className="mr-3 text-2xl text-red-500">⚠ </span>} 
            <p className={`${textClassName} text-em font-semibold text-red-500`}>{message}</p>
        </div>
    </div>
)

export {ErrorMessage}