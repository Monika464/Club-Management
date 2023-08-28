import React, { useState } from 'react';
import './Login.css';
import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export interface IApplicationProps {};


const LoginPage: React.FunctionComponent<IApplicationProps> =(props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    console.log("navigate ",navigate )
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async()=>{
        setAuthing(true);

        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
        .then((response) =>{
            navigate('/');
            console.log("hej");
              //console.log(response.user.uid);
        }).catch(error =>{
            console.log(error);
            setAuthing(false);
            console.log("ho");
         })
    }

    return (
        <div>
            <p>Login page</p>
            <button onClick={signInWithGoogle} disabled={authing}>signInWithGoogle</button>
        </div>
    )
}

export default LoginPage;
