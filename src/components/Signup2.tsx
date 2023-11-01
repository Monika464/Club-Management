export interface IApplicationProps {};
import { FormEvent, useEffect, useState } from 'react';
import { useMultistepForm } from '../hooks/useMultiStepForm';
import { AccountForm } from './AccountForm';
import './Signup2.css'
import { StartAndOptionForm } from './StartEndOptionsForm';
import { UserForm } from './UserForm';
//import { useSingnInToBase } from '../hooks/useSigninToBase';
import {SigninSendingTest}  from './SigninSendingTest';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
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

    const [authing, setAuthing] = useState(false);
    const auth = getAuth();
const navigate = useNavigate();

   console.log("czy w signup option?",option )


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

//popraw wyswietlanie wieku z dob jako normalnej daty

  
<SigninSendingTest 
name={name} 
surname={surname}
dob={dob}
option={option}
startDay ={startDay}
email ={email}
password={password}
/>

const handleCreateUser =()=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((response) =>{console.log('response',response)})
}


const checkFormVisib =()=>{


}


/*
const handleCreateUser =()=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((response) =>{
    navigate('/');
    console.log("hej");
      //console.log(response.user.uid);
     // response.user.uid === "2kyaZZ40UMc1nLaIexUoFKyfVtJ3" ? navigate('/signup'): navigate('/')
}).catch(error =>{
    console.log(error);
    setAuthing(false);
    console.log("ho");
 })

};
*/



//console.log("name,surname",name, surname, dob, option, startDay?.toDate(),email, password)

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
        
            </div>
            </form>
            <button onClick={handleCreateUser}>Create User</button>
            <div>{name} {surname} {dob.toString()}{option}{email}{startDay?.toDate().toString()}</div>
            {/*{isLastStep && <SigninSendingTest name={null} surname={null} dob={undefined} startDay={undefined} option={''} email={email} password={password}/>}*/}
            {isLastStep && <SigninSendingTest name={name} surname={surname} dob={dob} startDay={startDay} option={option} email={email} password={password}/>}
         
        </div>
    
         

    </div>)
}

export default Signup2;