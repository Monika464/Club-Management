export interface IApplicationProps {};
import { FormEvent, useState } from 'react';
import { useMultistepForm } from '../hooks/useMultiStepForm';
import { AccountForm } from './AccountForm';
import './Signup2.css'
import { StartAndOptionForm } from './StartEndOptionsForm';
import { UserForm } from './UserForm';
//https://www.youtube.com/watch?v=uDCBSnWkuH0
//18
const Signup2: React.FunctionComponent<IApplicationProps> =(props) => {

    const [name, setName] = useState<string|null>("");
    const [surname, setSurname] = useState<string|null>("");
    const [dob, setDob] = useState<Date>(new Date());
    const [option, setOption] = useState<string|null>("");
    const [startDay, setStartDay] = useState<Date | null>(null);
    const [email, setEmail] = useState<string|null>("");
    const [password, setPassword] = useState<string|null>("");
    


    const {steps,currentStepIndex,step,isFirstStep,isLastStep,back, next} = useMultistepForm([
        <UserForm 
        setName={setName} 
        name={name} 
        setSurname={setSurname} 
        surname={surname}
        dob={dob}
        setDob={setDob}
        />,
        <StartAndOptionForm
        option={option}
        setOption={setOption}
        startDay ={startDay}
        setStartDay = {setStartDay}
        />,
        <AccountForm
        email ={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        />,

]);


console.log("name,surname",name, surname, dob, option, startDay?.toDate(),email, password)

function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("Successful Account Creation")
  }

    return (<div >

        <div className="signupForm">
            <form onSubmit={onSubmit}>
               <div className={"pageNum"}>
                 {currentStepIndex + 1}/{steps?.length}
               </div>
               {step}
              
               
               
            
            <div className='pageContent'>
                {!isFirstStep && 
                <button type="button" onClick={back}>
                    Back
                </button>}
              {/*<button type="button" onClick={next}>{isLastStep? "Finish": "Next"}</button>*/}
              {!isLastStep && <button type="button" onClick={next}>Next</button>}
              {isLastStep && <button>submit form </button>}
            </div>
            </form>

            <div>{name} {surname} {dob.toString()}{option}{email}{startDay?.toDate().toString()}</div>
           
        </div>
    
         

    </div>)
}

export default Signup2;