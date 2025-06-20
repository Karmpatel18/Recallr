import CloseIcon from "../icons/CloseIcon";
import Button from "./Button";
import { Input } from "./Input";
import { useState , useRef } from "react";
import { useAuth } from "../../context/useAuth";
interface ModalProps {
    onClose: () => void;
}

enum ContentType {
    Youtube="youtube",
    Twitter="twitter"
}
export const Modal = ({ onClose }: ModalProps) => {
    const [ type , SetType ] = useState(ContentType.Youtube);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const { userId } = useAuth();
    async function handleSubmit(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const token  = window.localStorage.getItem("token")
        const contentType = "youtube";
        const tag = "doc";
        const response = await fetch(import.meta.env.VITE_BACKEND_API + "/content", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`

            },
            
            body: JSON.stringify({
                title: title,
                link: link,
                type: contentType,
                tag: tag,
                userId
            }),
        })
        const data = await response.json();
        console.log(data.message)
    }
    return (
        <div  onClick={onClose}  className="fixed h-screen w-full backdrop-blur-sm bg-neutral-800/10 justify-center items-center top-0 left-0 z-10">
            <div className="flex w-full justify-center items-center h-screen z-0">
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="bg-neutral-50 flex flex-col max-w-md w-full h-auto p-4 rounded-2xl border-[1px] border-neutral-300 shadow-lg">
                    <div className="flex w-full justify-between mb-4">
                        <div className="text-lg text-neutral-900 font-semibold tracking-tight">Memorize</div>
                        <div className="cursor-pointer text-neutral-600" onClick={onClose}>
                            <CloseIcon />
                        </div>
                    </div>

                <div className="flex flex-col space-y-2">
                    <Input
                        ref={titleRef}
                        label="Title"
                        type="text"
                        placeholder="title"
                        required
                    />
                    
                    <Input
                        ref={linkRef}
                        label="Link"
                        type="text"
                        placeholder="Link"
                        required
                    />
                    <div className="flex gap-2">
                        <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary" } size="sm" onClick={()=>{
                            SetType(ContentType.Youtube)
                        }} />
                        <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary" } size="sm" onClick={()=>{
                            SetType(ContentType.Twitter)
                        }} />
                    </div>
                    
                    <Button text="submit" variant="primary" size="md" onClick={handleSubmit}/>
                </div>
                </div>
            </div>

        </div>
    )



}