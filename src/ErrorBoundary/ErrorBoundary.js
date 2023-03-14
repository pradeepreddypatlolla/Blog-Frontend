import React from "react";

class ErrorBoundary extends React.Component {  
    constructor(props) {  
      super(props);  
      this.state = { hasError: false };  
    }  
    
    componentDidCatch(error, info) {  
      // It will catch error in any component below. We can also log the error to an error reporting service.  
      return { hasError: true };  
    }  
    render() {  
      if (this.state.hasError) {  
          return (  
          <div>Something is wrong.</div>
      );  
      }  
      return this.props.children;   
    }  
  }  
  export default ErrorBoundary