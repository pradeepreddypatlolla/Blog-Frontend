import React from 'react'

const Warning = (props) => {
    console.log(props)
    
    const handleCloseWarning = ()=>{
        props.setIsOpen(false)
    }
  return (
    <div>
    {props.isOpen&& <><span>  {props.message}  </span> <i className='fa fa-close' onClick={handleCloseWarning} >  </i> </>} 
    </div>
  )
}

export default Warning
