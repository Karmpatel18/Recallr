import type { ReactElement } from "react";

interface HeroCardProps {
    title:string;
    description:string;
    heroicon:ReactElement;
}

export const HeroCard = ({title, description, heroicon}:HeroCardProps) => {
    return (
        <div className='max-w-[192px] border-[1px] border-neutral-200 w-full flex rounded-lg bg-neutral-100 flex-col p-3.5 hover:bg-neutral-100/40 transition-all duration-200 cursor-pointer'>
            
            <div className='text-purple-600 mb-2'>
                {heroicon}
            </div>
            <div className='text-md tracking-tight text-neutral-800 font-medium mb-1.5'>{
                title}</div>
            <p className='text-[13px] tracking-tight text-neutral-400 font-normal'>{description}</p>
        </div>
    )
}