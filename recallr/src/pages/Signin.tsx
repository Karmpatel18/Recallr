import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../context/useAuth";

export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    
    
    async function handleSignin() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await fetch(import.meta.env.VITE_BACKEND_API + "/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // tells the backend to expect JSON
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            const data = await response.json();
            console.log(data.send)
            if (response.ok) {
                toast.success("Sign-in successful!")
                login(data.userId, data.token);
                
                console.log('Signed in successfully!');
                navigate("/dashboard")
                
            } else {
                toast.error(data.message || "Something went wrong");
                console.error('Error:', data.message);
            }
            
            // window.location.reload();
        }

        catch (err) {
            console.error(err);
            
            toast.error("Server error");
        }


    }
    

    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="flex flex-col max-w-md space-y-3 w-full p-4 bg-primary rounded-2xl border-neutral-200 border-[1px]">
                    <div className="font-semibold text-2xl tracking-tighter">
                        Signin recallr*
                    </div>
                    <Input
                        ref={usernameRef}
                        placeholder="username"
                        label="username"  />
                    <Input
                        ref={passwordRef}
                        placeholder="password"
                        label="password"  />
                    <Button
                        onClick={handleSignin}
                        text="Signin"
                        variant="primary"
                        size="md" />
                </div>
                <div className="text-neutral-400 tracking-tighter mt-2 font-normal">Don't have an account
                    <span
                        onClick={() => {
                            navigate("/signup")
                        }}
                        className="text-neutral-800 underline underline-offset-2 cursor-pointer ml-1.5">SignUp now</span>
                </div>
                
            </div>
        </div>


    )
}