import {formatDate} from "./formatDate"
import { useRef } from "react";
interface CardComponentProps {
    title: string;
    link: string;
    type: string;
    createdAt?: string;
}

export const Card: React.FC<CardComponentProps> = (CardProps: CardComponentProps) => {
    const typeCheck = useRef("");
    typeCheck.current = CardProps.type;
    const link = CardProps.link;
    const updatedLink = link.replace("youtu.be", "www.youtube.com/embed");       
    return (
        <div className="bg-primary border-[1px] border-neutral-300 rounded-lg min-h-56 h-min  max-w-[364px] w-full px-4 pb-4">
            <div className="flex w-full justify-between">
                <div className="text-xl pt-4  font-medium tracking-tighter text-neutral-900 pl-1.5">{CardProps.title}</div>
                {/* <div className="bg-neutral-800 rounded-b-xl px-2.5 py-1.5 h-min text-neutral-50 text-sm tracking-tight top-0 border-b-4 border-x-4 border-neutral-300">{formatDate(CardProps.createdAt)}</div> */}
                <div className={`${typeCheck.current === "youtube" ? "bg-red-500 border-red-300" : "bg-blue-500 border-blue-300"} rounded-b-xl px-2.5 py-1.5 h-min text-neutral-50 text-sm tracking-tight top-0 border-b-4 border-x-4 `}>{CardProps.type}</div>
            </div>
            
            <div className="w-full h-min  mt-2">
                <iframe
                    width="560"
                    height="215"
                    className="w-full flex rounded-md "
                    src={updatedLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

