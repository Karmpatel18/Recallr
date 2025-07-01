import { ShareIcon } from '../components/icons/ShareIcon';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { SideBar } from '../components/ui/SideBar';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import Masonry from 'react-masonry-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const breakpointColumnsObj = {
    default: 3,
    768: 2,
    480: 1,
};
export const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("userone")
    const [loading, setLoading] = useState(true);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
    const { userId, token } = useAuth();

    useEffect(() => {
        if (!userId || !token) return

        setData([]);
        setUsername("userone");

        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_API + `/content?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch content");
                }

                const result = await response.json();
                if (result) {
                    setLoading(false);
                }
                setData(result.content);
                setUsername(result.username.username);
                console.log(result) // result should be an array of content
            } catch (error) {
                console.error(error);
            }
        };
        setInterval(() => {
            fetchData();
            console.log("fetching data")
        },5000 );
            



    }, [userId, token]);
    if (loading) {
        return (
            <div className='flex w-full h-screen justify-center items-center text-neutral-800'>
                <div className="w-10 h-10 border-4 border-neutral-800 border-t-transparent border-l-transparent rounded-full animate-spin" />
            </div>)
    }

    const handleSync = async () => {
        if (!token) return;
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/vector/sync', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to sync content');
            }
            toast.success('Content synced to your brain!');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to sync content');
        }
    };

    return (
        <div className='flex w-full  m-2 '>
            <div className='flex w-full'>
                <SideBar username={username} />

                <div className=' flex flex-col w-full h-auto ml-64'>
                    <div className='flex gap-2 flex-row-reverse h-min'>
                        <Button text='share' variant='secondary' endicon={<ShareIcon />} size='md' />
                        <Button text='Add content' variant='primary' size='md' onClick={handleOpen} />
                        <Button text='Sync to Brain' variant='secondary' size='md' onClick={handleSync} />
                    </div>
                    {/* <div className=' gap-3 mt-4 overflow-y-scroll columns-1 sm:columns-2 md:columns-3  h-[1200px]'> */}
                    {/* Render Cards dynamically if data is available */}
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex  mt-6 gap-3  w-[1118px]"
                        columnClassName="space-y-4 "
                    >
                        {data.map((item, index) => (
                            <Card
                                key={index}
                                //@ts-expect-error typeError
                                title={item.title}
                                //@ts-expect-error typeError
                                link={item.link}
                                //@ts-expect-error typeError
                                type={item.type}
                                //@ts-expect-error typeError
                                createdAt={item.createdAt}
                            />
                        ))}
                    </Masonry>

                    {/* </div> */}



                </div>
            </div>

            {isModalOpen && <Modal onClose={handleClose} />}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        </div>
    );
};
