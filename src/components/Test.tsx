 import '../pages/userpanel.css'
export interface Itest{}  

export const Test : React.FunctionComponent<Itest> =(props) => { 

  
  return (
  <>
     <div  className='main'>
      <div className='box'>
  <div className="one">Item 1</div>
  <div className="two">Item 2</div>
  <div className="three">Item 3</div> 
  </div>
</div>
<div  className='main'>
      <div className='box'>
  <div className="one">Item 1</div>
  <div className="two">Item 2</div>
  <div className="three">Item 3</div> 
  </div>
</div>        

  </>)


}


