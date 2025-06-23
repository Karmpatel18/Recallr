// import { formatDate } from "./formatDate"
import { useRef } from "react";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TwitterTweetEmbed } from 'react-twitter-embed';




interface CardComponentProps {
    title: string;
    link: string;
    type: string;
    createdAt?: string;
}
function extractTweetId(url:string) {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

export const Card: React.FC<CardComponentProps> = (CardProps: CardComponentProps) => {
    const typeCheck = useRef("");
    typeCheck.current = CardProps.type;
    const link = CardProps.link;
    const updatedLink = typeCheck.current === "youtube" ? link.replace("youtu.be", "www.youtube.com/embed") : (extractTweetId(link)) ;
    
    return (
        <div className="bg-primary border-[1px] border-neutral-300 rounded-xl min-h-56 h-min  max-w-[364px] w-full px-4 pb-4">
            <div className="flex w-full justify-between">
                <div className="text-xl pt-4  font-medium tracking-tighter text-neutral-900 pl-1.5">{CardProps.title}</div>
                {/* <div className="bg-neutral-800 rounded-b-xl px-2.5 py-1.5 h-min text-neutral-50 text-sm tracking-tight top-0 border-b-4 border-x-4 border-neutral-300">{formatDate(CardProps.createdAt)}</div> */}
                <div className={`${typeCheck.current === "youtube" ? "bg-red-600 border-red-300 text-neutral-50" : "bg-neutral-800 border-neutral-600"} rounded-b-xl px-2.5 py-1.5 h-min text-neutral-50 text-sm tracking-tight   border-b-4 border-x-4 `}>{typeCheck.current === "youtube" ? (<FaYoutube />) : (<FaXTwitter />)}</div>
            </div>
            {typeCheck.current === "youtube" ? (
                <div className="w-full h-min  mt-2">
                    <iframe
                        width="560"
                        height="215"
                        className="w-full flex rounded-lg "
                        src={updatedLink ?? ""}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (<div className="w-full h-min  mt-2 overflow-clip">
                <TwitterTweetEmbed
                    
                    tweetId={updatedLink ?? ""}
                    options={{
                        theme: 'light', // or 'light'
                        cards: 'hidden', // hides link previews
                        conversation: 'all', // hides replies
                        align: 'center'
                    }}
                />
            </div>)}


        </div>
    );
};

// <blockquote className="twitter-tweet h-min w-min">
//                         <a href="https://twitter.com/username/status/807811447862468608"></a>
//                     </blockquote>

