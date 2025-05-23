
import './App.css'
import { ShareIcon } from './components/icons/ShareIcon'
import Button from './components/ui/Button'
import { SideBar } from './components/ui/SideBar'

function App() {


  return (

    <div className='bg-[#F0F0F0] font-inter flex w-full p-2 h-screen'>
      <SideBar />
      <div className='ml-96'>
        <Button text='share' variant='primary' endicon={<ShareIcon />} size='md'/>
      </div>
    </div>
  )
}

export default App
