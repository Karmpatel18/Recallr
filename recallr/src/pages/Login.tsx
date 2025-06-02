import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    //@ts-expect-error any
    const handleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            const res = await axios.post("http://localhost:3000/api/v1/auth/google", {
                token,
            });

            // Save JWT
            localStorage.setItem("jwt", res.data.jwt);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden w-full">
                {/* Optional Grid Background */}
                <svg
                    className="absolute inset-0  text-neutral-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern id="squareGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                            <path d="M10 0 L0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#squareGrid)" />
                </svg>







                <div className="bg-neutral-50 p-4 rounded-lg border-[1px] border-neutral-300 z-60 shadow-lg ">
                    <h1 className="z-10 text-4xl font-semibold text-neutral-800 mb-1 tracking-tight ">RECALLR</h1>
                    <p className="z-10 text-neutral-500 font-normal tracking-tight text-sm mb-4">
                        Your smart space to remember what matters — tweets, videos, docs.
                    </p>
                    
                    <GoogleLogin

                        onSuccess={handleLoginSuccess}
                        onError={() => console.log("Login Failed")}
                    />
                    {/* Optional Footer or Tagline */}
                    <p className="z-10 mt-4 text-xs text-neutral-400 text-center font-normal">No passwords. No clutter. Just Recallr.</p>
                </div>




            </div>

        </div>
    );
}

