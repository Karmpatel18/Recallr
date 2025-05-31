import CloseIcon from "../icons/CloseIcon";
import { Input } from "./Input";
import { useState } from "react";
interface ModalProps {
    onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
    const [email, setEmail] = useState("");
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


                    <Input
                        label="Title"
                        type="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

        </div>
    )



}