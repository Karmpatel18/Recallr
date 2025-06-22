import { useState } from "react";
import { PopModal } from "./PopModal";

interface SideBarProps{
    username: string,
}
export const SideBar = (Props:SideBarProps) => {
    const [isPopModelOpen , setPopModelOpen ] = useState(false);
    function handleModalClose(){
        setPopModelOpen(!isPopModelOpen)
    }
    function handleModalOpen(){
        setPopModelOpen(true)
    }
    

    return (
        <div className={`h-full max-h-screen  bg-primary rounded-xl transition-all duration-300 p-4 w-60 border-[1px] border-[#D2D2D2] flex flex-col justify-between`}>
            <div className="flex flex-col">
                <div className="flex space-x-2 items-center">
                    <div className="bg-pink-300 w-12 h-12 rounded-lg">
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold tracking-tighter text-2xl">Recallr</div>
                        <div className="font-medium tracking-normal text-md ">{Props.username}</div>
                    </div>
                </div>
                <div className="border-b-[1px] border-neutral-200 mt-4"></div>
            </div>
            <div
            onClick={handleModalOpen}
            className="text-md tracking-tight text-red-600 transition-all hover:text-red-500 font-medium bg-primary hover:bg-secondary duration-200 rounded-md px-3 py-2 text-center cursor-pointer">Logout</div>
            {isPopModelOpen ? <PopModal onClose={handleModalClose}/> : null}
        </div>
    )
}