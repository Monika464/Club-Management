//https://www.youtube.com/watch?v=2aumoR0-jmQ react router ts
//https://www.youtube.com/watch?v=b_52NmIfDr8  authen
import './App.css'
import Userpanel from "./pages/Userpanel.tsx";
import Adminpanel from "./pages/Adminpanel.tsx";
import HomePage from "./pages/Home.tsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Signup} from "./components/Signup.tsx";
import LoginPage from "./components/Login.tsx";
import { initializeApp } from 'firebase/app';
import { config } from './config/config.ts';
import AuthRoute from './components/AuthRoute.tsx';

//  initializeApp(config.firebaseConfig)//just once
//export const firebase = initializeApp(config.firebaseConfig);
const fire = initializeApp(config.firebaseConfig)
//console.log("fire",fire)

//https://www.youtube.com/watch?v=b_52NmIfDr8  5: 31

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
        <Routes>
        
            <Route 
             path="/" 
             element={
                       /*<AuthRoute>*/
                       <AuthRoute>
                            <HomePage />
                        </AuthRoute>
                       /* </AuthRoute>*/
                    }
            />
            
              <Route path="adminpanel" element={<Adminpanel/>}/>
              <Route path="userpanel" element={<Userpanel />}/>
              <Route path="signup" element={<Signup />}/>
              <Route path="login" element={<LoginPage />}/>

    </Routes>
</BrowserRouter>
  )
}

export default Application;


