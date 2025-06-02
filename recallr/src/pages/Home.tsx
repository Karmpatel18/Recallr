import HandArrow from '../components/icons/HandArrow';
import Button from '../components/ui/Button'
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
function Home() {
    
    return (
        <div className='flex flex-col min-h-screen w-full'>
            <div className='flex w-full justify-between px-10 py-4 h-min items-center'>
                <div className='font-semibold tracking-wider text-lg'>RECALLR</div>
                <div className='flex gap-2'>
                    
                    <Link to="/login">
                        <div>
                            <Button text='Login' variant='secondary' size='md'/>
                        </div>
                    </Link>
                    <Button 
                    text='Get Started' 
                    variant='primary' 
                    endicon={<BsArrowRight size={22}/>} 
                    size='md'/>
                    
                    
                </div>
            </div>
            <div className='h-[1062px] overflow-hidden'>
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
                        <HandArrow/>
                        </div>
                        <div className='flex mt-6 gap-2'>
                            <Button text='Get Started' variant='primary' size='md'/>
                            <Button text='Developer' variant='secondary' size='md'/>
                        </div>
                        <div className='mt-24 shadow-2xl'>
                            <img className='' src='./Screen.png'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-4 px-10 border-[1px] border-neutral-900 text-[13px] w-full flex  text-neutral-400 bg-neutral-900 items-center gap-2 justify-center font-normal'><span className='tracking-wider'>RECALLR</span>&copy; 2025 
            </div>
        </div>

    )
}

export default Home
