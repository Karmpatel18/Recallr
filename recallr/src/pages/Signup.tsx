import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";
export const Signup = () => {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    async function handleSignup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await fetch(import.meta.env.VITE_BACKEND_API + "/signup",
            {
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
        console.log('Response:', data);
        navigate("/signin")
    }
    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col max-w-md space-y-3 w-full p-4 bg-primary rounded-2xl border-neutral-200 border-[1px]">
                <div className="font-semibold text-2xl tracking-tighter">
                    Signup recallr*
                </div>
                <Input
                    ref={usernameRef}
                    placeholder="username"
                    label="username" />
                <Input
                    ref={passwordRef}
                    placeholder="password"
                    label="password" />
                <Button
                    onClick={handleSignup}
                    text="Signup"
                    variant="primary"
                    size="md" />
            </div>
            <div className="text-neutral-400 tracking-tighter mt-2 font-normal">already have an account 
                <span 
                onClick={() => {
                    navigate("/signin")
                } }
                className="text-neutral-800 underline underline-offset-2 cursor-pointer ml-1.5">SignIn</span></div>
            </div>
        </div>
    );
}












