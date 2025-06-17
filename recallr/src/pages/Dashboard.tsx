import { ShareIcon } from '../components/icons/ShareIcon';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { SideBar } from '../components/ui/SideBar';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
export const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
    const { userId, token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_API + `/content?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${token}`
                        
                    },
                   
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch content");
                }

                const result = await response.json();
                setData(result.content);
                console.log(result) // result should be an array of content
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex w-full min-h-screen p-2'>
            <div className='flex w-full'>
                <SideBar />
                <div className='ml-4 flex flex-col w-full h-min'>
                    <div className='flex gap-2 flex-row-reverse'>
                        <Button text='share' variant='secondary' endicon={<ShareIcon />} size='md' />
                        <Button text='Add content' variant='primary' size='md' onClick={handleOpen} />
                    </div>
                    <div className='flex max-w-full w-full flex-wrap gap-3'>
                    {/* Render Cards dynamically if data is available */}
                    {data.map((item, index) => (
                        <Card key={index} title={item.title} link={item.link} />
                    ))}
                    </div>
                    {/* Static example card */}
                    <Card link={"https://youtu.be/UzJg19Z8nlg?si=qzvHfowRXuvCJVoN"} />

                    <blockquote className="twitter-tweet">
                        <a href="https://twitter.com/username/status/807811447862468608"></a>
                    </blockquote>
                </div>
            </div>

            {isModalOpen && <Modal onClose={handleClose} />}
        </div>
    );
};
