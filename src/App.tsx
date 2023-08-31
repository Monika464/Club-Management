//https://www.youtube.com/watch?v=2aumoR0-jmQ react router ts
//https://www.youtube.com/watch?v=b_52NmIfDr8  authen
import './App.css'
import Userpanel from "./pages/Userpanel.tsx";
import Adminpanel from "./pages/Adminpanel.tsx";
import HomePage from "./pages/Home.tsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignupPage from "./components/Signup.tsx";
import LoginPage from "./components/Login.tsx";
import { initializeApp } from 'firebase/app';
import { config } from './config/config.ts';
import AuthRoute from './components/AuthRoute.tsx';
import AdminRoute from './components/AdminRoute.tsx';
import Navbar from './components/Navbar.tsx';

//  initializeApp(config.firebaseConfig)//just once
//export const firebase = initializeApp(config.firebaseConfig);
const fire = initializeApp(config.firebaseConfig)
//console.log("fire",fire)

//https://www.youtube.com/watch?v=b_52NmIfDr8  5: 31

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
        
            <Route 
             path="/" 
             element={
                       /*<AuthRoute>*/
                      
                            <HomePage />
                       
                       /* </AuthRoute>*/
                    }
            />
             
              <Route 
              path="adminpanel" 
              element={
                       <AdminRoute>
                         <Adminpanel/>
                        </AdminRoute>

                      }
              />
              <Route path="userpanel" element={
                <AuthRoute>
              <Userpanel />
              </AuthRoute>       
              
              }/>
              <Route path="signup" element={<SignupPage />}/>
              <Route path="login" element={<LoginPage />}/>

    </Routes>
</BrowserRouter>
  )
}

export default Application;


