import loadingGIF from '../../assets/loading-gif.gif'
import { useAuthState } from '../../context/context'
import './Loader.css'
const Loader = () => {
    const authState = useAuthState()
   
  return (
   <>
   {authState.loading?<div className="loader-container">
      <div className="loader-gif">
        <img src={loadingGIF} alt="" />
      </div>
    </div>:""} 
   </>
  )
}

export default Loader
