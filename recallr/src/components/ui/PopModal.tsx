import Button from "./Button";
import { useNavigate } from "react-router-dom";
interface PopModal {
    onClose: () => void
}
export const PopModal = ({onClose} : PopModal) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            window.localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
        

    }
    return (
        <div  className="fixed h-screen w-full backdrop-blur-sm bg-neutral-800/10 justify-center items-center top-0 left-0 z-10">
            <div className="flex w-full justify-center items-center h-screen z-0">
                
                    
                        
                        
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-neutral-50 flex flex-col max-w-min w-full h-auto p-3 rounded-2xl border-[1px] border-neutral-300 shadow-lg ">
                            <div className="flex justify-center flex-col ">
                                <div className="text-md text-center font-medium tracking-tight mb-2 ml-1">Want to logout?</div>
                                <div className="flex gap-2">
                                    <Button text="Confirm" variant="danger" size="md" onClick={handleLogout}/>
                                    <Button text="Cancel" variant="secondary" size="md" onClick={onClose} />
                                </div>
                            </div>
                        </div>


                    


                
            </div>

        </div>
    )
}


