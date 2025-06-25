import { useState } from "react";
import { PopModal } from "./PopModal";
import { SiCampaignmonitor } from "react-icons/si";
import { TbArrowBarToRight } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

interface SideBarProps{
    username: string,
}
export const SideBar = (Props:SideBarProps) => {
    const [isPopModelOpen , setPopModelOpen ] = useState(false);
    const navigate = useNavigate();
    function handleModalClose(){
        setPopModelOpen(!isPopModelOpen)
    }
    function handleModalOpen(){
        setPopModelOpen(true)
    }
    function handleChatClick() {
        navigate('/chat-brain');
    }
    

    return (
        <div className={` max-h-screen  bg-primary rounded-xl transition-all duration-300 p-4 w-60 border-[1px] border-[#D2D2D2] flex flex-col justify-between fixed h-[810px]`}>
            <div className="flex flex-col">
                <div className="flex space-x-2 items-center">
                    <div className="bg-neutral-800 flex justify-center items-center text-neutral-50  w-12 h-12 rounded-lg">
                        <SiCampaignmonitor size={22} className="rotate-90"/>
                    </div>
                    <div className="flex flex-col leading-4">
                        <div className="font-semibold tracking-tighter text-2xl">Recallr</div>
                        <div className="font-medium tracking-tight text-md text-neutral-700 mb-2">{Props.username}</div>
                    </div>
                </div>
                <div className="border-b-[1px] border-neutral-200 mt-4"></div>
            <div className="flex items-center bg-secondary cursor-pointer mt-2 rounded-md text-md font-medium tracking-tighter py-2 px-3 justify-between hover:bg-neutral-800 hover:text-neutral-50 transition-all duration-200 group" onClick={handleChatClick}>Chat with your brain<TbArrowBarToRight className="group-hover:scale-105"/></div>
            </div>
            <div
            onClick={handleModalOpen}
            className="text-md tracking-tight text-red-600 transition-all hover:text-red-500 font-medium bg-primary hover:bg-secondary duration-200 rounded-md px-3 py-2 text-center cursor-pointer">Logout</div>
            {isPopModelOpen ? <PopModal onClose={handleModalClose}/> : null}
        </div>
    )
}