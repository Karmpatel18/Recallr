import HandArrow from '../components/icons/HandArrow';
import Button from '../components/ui/Button'
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
// import { HiPlay } from "react-icons/hi";
import { TbShieldHeart } from "react-icons/tb";
import Line from '../components/icons/Line';
import { FaGithub } from "react-icons/fa";

function Home() {

    const navigate = useNavigate();
    const { token } = useAuth();

    return (
        <div className='flex flex-col min-h-screen w-full'>
            <div className='flex w-full justify-between px-10 py-4 h-min items-center'>
                <div className='font-semibold tracking-wider text-lg'>RECALLR</div>
                <div className='flex gap-2'>
                    {token ? (
                        <Button
                            text='Dashboard'
                            variant='primary'
                            endicon={<BsArrowRight size={22} />}
                            size='md'
                            onClick={() => {
                                navigate("/dashboard");
                            }} />
                    ) : (<Button
                        text='Get Started'
                        variant='primary'
                        endicon={<BsArrowRight size={22} />}
                        size='md' />)
                    }
                    {!token ? (<Link to="/signup">
                        <div>
                            <Button
                                text='Login'
                                variant='secondary'
                                size='md' />
                        </div>
                    </Link>) : (null)}


                </div>
            </div>
            <div className='h-[1216px] overflow-hidden border-b-[1px] border-neutral-200 '>
                <div className='relative h-screen -mt-[1px] '>
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
                    <div className='relative w-full justify-center flex flex-col items-center'>
                        <div className='text-5xl font-normal tracking-tight mt-24'>Focus. Organise. Recall.</div>
                        <div className='text-md text-neutral-500 font-normal max-w-[586px] text-center mt-6 tracking-tight'>Never lose your place again — whether it’s a tweet, a video, or a document, Recallr brings it back to you exactly when and where you need it.</div>
                        <div className='absolute mr-[404px] top-56 rotate-[118deg] text-neutral-300'>
                            <HandArrow />
                        </div>
                        <div className='flex mt-6 gap-2'>
                            <Button text='Get Started' variant='primary' size='md' />
                            <Button text='Developer' variant='secondary' size='md' />
                        </div>
                        <div className='mt-24 '>
                            <div className='relative flex w-[1012px] h-[624px] ring-[20px] ring-neutral-800 rounded-4xl justify-center items-center shadow-2xl z-0 overflow-hidden'>
                                {/* <div className='absolute z-40'>
                                    <HiPlay size={68}/>
                                    
                                </div> */}
                                <iframe height={624} width={1012} className=' z-10' src="https://www.youtube.com/embed/YZIWSUQ8Irk?si=64l90FAvMlRh6hve" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center items-center h-auto overflow-clip relative  gap-8 flex-col'>
                <div className='bg-neutral-100/20  rounded-4xl w-[460px]  p-8 z-60 border-[1px] border-neutral-200 mt-12'>
                    <span className='bg-neutral-50'>
                        <div className='relative'>
                            <div className=' mb-12 text-xl font-medium  tracking-tighter'>What will you get?</div>
                            <div className='absolute top-6 rotate-6 left-24 text-purple-500'>
                                <Line />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex mb-6'>
                                <div className='flex flex-col w-full gap-3 flex-wrap'>

                                    <div className='flex gap-3'>
                                        <div className='max-w-[192px] w-full flex rounded-lg bg-neutral-100/30 flex-col p-3.5 border-[1px] border-neutral-200'>
                                            <TbShieldHeart size={28} className='text-purple-600 mb-2' />
                                            <div className='text-md tracking-tight text-neutral-800 font-medium mb-1.5'>Super like</div>
                                            <p className='text-[13px] tracking-tight text-neutral-400 font-normal'>Highlight your interest instantly.</p>
                                        </div>

                                        <div className='max-w-[192px] border-[1px] border-neutral-200 w-full flex rounded-lg bg-neutral-100/30 flex-col p-3.5 '>
                                            <TbShieldHeart size={28} className='text-purple-600 mb-2' />
                                            <div className='text-md tracking-tight text-neutral-800 font-medium mb-1.5'>Super like</div>
                                            <p className='text-[13px] tracking-tight text-neutral-400 font-normal'>Highlight your interest instantly.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className='border-[1px] border-neutral-200 max-w-[192px] w-full flex rounded-lg bg-neutral-100/30 flex-col p-3.5 '>
                                            <TbShieldHeart size={28} className='text-purple-600 mb-2' />
                                            <div className='text-md tracking-tight text-neutral-800 font-medium mb-1.5'>Super like</div>
                                            <p className='text-[13px] tracking-tight text-neutral-400 font-normal'>Highlight your interest instantly.</p>
                                        </div>

                                        <div className='border-[1px] border-neutral-200 max-w-[192px] w-full flex rounded-lg bg-neutral-100/30 flex-col p-3.5 hover:bg-neutral-100/40 transition-all duration-200'>
                                            <TbShieldHeart size={28} className='text-purple-600 mb-2' />
                                            <div className='text-md tracking-tight text-neutral-800 font-medium mb-1.5'>Super like</div>
                                            <p className='text-[13px] tracking-tight text-neutral-400 font-normal'>Highlight your interest instantly.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button text='Checkout now' variant='primary' size='md' />
                        </div>
                    </span>
                </div>

                <div className='py-4 px-10 border-[1px]  border-neutral-200 text-[13px] w-full flex  text-neutral-800 bg-neutral-100 items-center gap-2 justify-between font-normal'>
                    <div>
                        <span className='tracking-wider'>RECALLR</span>&copy; 2025
                    </div>
                    <div><Button variant='secondary' text='Github' starticon={<FaGithub />} /></div>
                </div>

                <div className='absolute  z-50 gap-3   '>
                    <div className='h-44 w-44 bg-blue-400 rounded-full blur-[100px] mr-44'></div>
                    <div className='h-44 w-44 bg-purple-400 rounded-full blur-[100px] mb-20'></div>
                    <div className='h-44 w-44 bg-pink-500 rounded-full blur-[100px] ml-44'></div>
                </div>
            </div>

        </div>

    )
}

export default Home
