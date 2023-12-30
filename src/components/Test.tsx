 import '../pages/userpanel.css'
 import './displayDetails/displayNextTrainings.css'
export interface Itest{}  

export const Test : React.FunctionComponent<Itest> =(props) => { 

  
  return (
  <>

<div className='main'>
        <div className='box'>
          <div className='zero'>
            <div className='profile'>profile</div>
            <div className='mail'>mail</div>
            
            </div>
          <div className='content'>
            <div className='linkowisko'>linkowisko</div>
            <div className='glowna'>glowna</div>        
            {/* <div className='three'>Item 3</div> */}
        
          </div>
{/* wyjete poza content */}
          <div className='itemsAB'>
               <div className='item a'>Item a</div>
               <div className='item b'>Item b</div>
               <div className='item c'>Item c</div>
               <div className='item d'>Item d</div>
           </div>
        </div>
      </div>
     {/* <div  className='main'>
      <div className='box'>
      <div className="zero">Item 0</div>     
  <div className="one">Item 1</div>
  <div className="two">Item 2</div>
  <div className="three">Item 3</div> 
  </div>
</div> */}
{/* <div  className='main'>
      <div className='box'>
  <div className="one">Item 1</div>
  <div className="two">Item 2</div>
  <div className="three">Item 3</div> 
  </div>
</div>         */}

  </>)


}

export default Test


