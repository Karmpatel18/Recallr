
import './App.css'
import { ShareIcon } from './components/icons/ShareIcon'
import Button from './components/ui/Button'

function App() {
  

  return (
    
    <div className='bg-neutral-50 font-inter flex w-full justify-center h-screen items-center'>
    <Button text='share' variant='primary' endicon={<ShareIcon/>} />
    </div>
  )
}

export default App
