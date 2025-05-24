
import './App.css'
import { ShareIcon } from './components/icons/ShareIcon'
import Button from './components/ui/Button'
import { Card } from './components/ui/Card'
import { SideBar } from './components/ui/SideBar'

function App() {


  return (

    <div className='bg-secondary font-inter flex w-full p-2 h-screen'>
      <SideBar />
      <div className='ml-4 flex flex-col w-full  h-min'>
        <div className='flex gap-2 flex-row-reverse'>
          <Button text='share' variant='secondary' endicon={<ShareIcon />} size='md'/>
          <Button text='Add content' variant='primary' size='md'/>
        </div>
        <Card/>
      </div>
      
    </div>
  )
}

export default App
