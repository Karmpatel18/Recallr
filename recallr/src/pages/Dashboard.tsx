import { ShareIcon } from '../components/icons/ShareIcon';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { SideBar } from '../components/ui/SideBar';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  768: 2,
  480: 1,
};
export const Dashboard = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ username , setUsername ] = useState("userone")
    const [ loading , setLoading ] = useState(true);
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
                        'Authorization': `${token}`
                        
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch content");
                }

                const result = await response.json();
                if(result){
                    setLoading(false);
                }
                setData(result.content);
                setUsername(result.username.username);
                console.log(result) // result should be an array of content
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();


        
    }, [userId, token]);
    if(loading){
        return(<div className='flex w-full gap-3 m-3 animate-pulse'>
            <div className='flex-1/4 w-full  bg-gradient-to-tl from-neutral-200/80 via-neutral-200 to-neutral-600/40 rounded-lg'></div>
            <div className='flex-3/4 w-full  bg-gradient-to-br from-neutral-200/80 via-neutral-200 to-neutral-600/40 rounded-lg'></div>
        </div>)
    }

    

    return (
        <div className='flex w-full  m-2 '>
            <div className='flex w-full'>
                <SideBar username={username}/>
                
                <div className=' flex flex-col w-full h-auto ml-64'>
                    <div className='flex gap-2 flex-row-reverse h-min'>
                        <Button text='share' variant='secondary' endicon={<ShareIcon />} size='md' />
                        <Button text='Add content' variant='primary' size='md' onClick={handleOpen} />
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
        </div>
    );
};
