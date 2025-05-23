// import { useState } from "react"
export const SideBar = () => {
    // const [open, SetOpen] = useState(true)
    // let openClass = "";
    // if (open) {
    //     openClass = "w-64"
    // }
    // else {
    //     openClass = "w-fit"
    // }
    // function handleToggle() {
    //     SetOpen(prev => !prev);
    // }

    return (
        <div className={`h-full  bg-[#F7F7F7] rounded-2xl transition-all duration-300 p-4 w-60 border-[1px] border-[#D2D2D2] `}>
            
            <div className="flex space-x-2 items-center">
                <div className="bg-orange-600 w-8 h-8 rounded-lg"></div>
                {/* <div className="font-semibold tracking-tighter text-2xl">Recallr</div> */}
                <div className="font-medium tracking-tight text-md">@username</div>
                
            </div>
            <div className="border-b-[1px] border-neutral-200 mt-4"></div>
        </div>
    )
}