import { ShareIcon } from '../components/icons/ShareIcon'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { SideBar } from '../components/ui/SideBar'
import { useState } from 'react'
export const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    async function handleContent() {
        const response = await fetch(import.meta.env.BASE_URL + "/content", {
            method: 'GET',
            headers: {
                'Authorization': `${window.localStorage.getItem("token")}`, // tells the backend to expect JSON
            },
        })
        if (!response.ok) {
            throw new Error("Failed to fetch content");
        }

        const data = await response.json();
        console.log("Content:", data);
        // Do something with the content

    }
    return (

        <div className='flex w-full min-h-screen p-2'>
            <div className='flex w-full '>
                <SideBar />
                <div className='ml-4 flex flex-col w-full  h-min'>
                    <div className='flex gap-2 flex-row-reverse'>
                        <Button text='share' variant='secondary' endicon={<ShareIcon />} size='md' />
                        <Button text='Add content' variant='primary' size='md' onClick={handleOpen} />
                    </div>

                    <Card />
                    <blockquote className="twitter-tweet">
                        <a href="https://twitter.com/username/status/807811447862468608"></a>
                    </blockquote>
                    <div onClick={handleContent}></div>
                </div>
            </div>
            {isModalOpen && <Modal onClose={handleClose} />}
        </div>

    )
}