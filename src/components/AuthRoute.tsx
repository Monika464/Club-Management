import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export interface IAuthRouteProps {};


const AuthRoute: React.FunctionComponent<IAuthRouteProps> =(props) => {
     const {children} = props;
     const auth = getAuth();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);

     useEffect(()=>{
        
     const AuthCheck = onAuthStateChanged (auth, (user)=>{
         if(user){
            setLoading(false)
            console.log("jest user",user.displayName, user.email);
            navigate('/');
                       
         } else {
            console.log("unauthorized");
            navigate('/login')
         }

     });

     return () => AuthCheck();

    },[auth]); 

  
    if (loading) return <p>loading...</p>

    return <>{children}</>
};

export default AuthRoute;