
const Footer = () => {
    const styles={
        display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    width: '100vw',
    marginTop: '100px',
    backgroundColor:'#333',
    color:'white',
    position:'fixed',
    bottom:'0',
    minHeight:'50px'
    }
  return (
    <div style={styles} >
       <div> blogIn. | All Rights Reserved &reg; </div> 
    </div>
  )
}

export default Footer
