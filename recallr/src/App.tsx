
import './App.css'
import { ShareIcon } from './components/icons/ShareIcon'
import Button from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Modal } from './components/ui/Modal'
import { SideBar } from './components/ui/SideBar'
import { useState } from 'react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (

    <div className='bg-secondary font-inter flex w-full p-2 h-screen'>
      
      <div className='flex w-full'>
        <SideBar />
      <div className='ml-4 flex flex-col w-full  h-min'>
        <div className='flex gap-2 flex-row-reverse'>
          <Button text='share' variant='secondary' endicon={<ShareIcon />} size='md' />
          <Button text='Add content' variant='primary' size='md' onClick={handleOpen} />
        </div>
        
        <Card />
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleClose}/>}
    </div>
  )
}

export default App
