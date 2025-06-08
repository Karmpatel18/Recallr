import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";


export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function handleSignin() {
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
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store JWT token
            console.log('Signed in successfully!');
        } else {
            console.error('Error:', data.message);
        }
        navigate("/dashboard")
    }
    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col max-w-md space-y-3 w-full p-4 bg-primary rounded-2xl border-neutral-200 border-[1px]">
                <div className="font-semibold text-2xl tracking-tighter">
                    Signin recallr*
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
                    onClick={handleSignin}
                    text="Signup"
                    variant="primary"
                    size="md" />
            </div>

        </div>
    )
}