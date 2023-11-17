
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import './Login.css';
import { 
  createUserWithEmailAndPassword, 
  getAuth,
   GoogleAuthProvider,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,signInWithPopup, 
   UserCredential 
  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { connectStorageEmulator } from 'firebase/storage';


export interface IApplicationProps {};


const SignupPage: React.FunctionComponent<IApplicationProps> =(props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    
    const defaultFormFields = {
      email: '',
      password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    //console.log("formFields",email,password )

    const signInWithGoogle = async()=>{
        setAuthing(true);

        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
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
    }
   
    
   // console.log("dane wpisane do forma",email,password );

 

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target
  
  setFormFields({...formFields, [name]: value })
  console.log("formFields",formFields);
}

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  
    // Send the email and password to firebase
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

  

    return (
      

        <div id="main" className="login-form"> 
        <div>Signup a new user</div>
      
         <div id="fields">
         </div>
         
         
         <form onSubmit={handleSubmit}>
        
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
          
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
           
              {/*<input id='recaptcha' type="submit" />*/}
         
          <button className="btn" disabled={authing} >Save </button>
          </form>
       
   
            <p>Google</p>
            <button onClick={signInWithGoogle} disabled={authing}>signInWithGoogle</button>
        </div>
    )
}

export default SignupPage;




