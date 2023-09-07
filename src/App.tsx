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
import { UserContextProvider} from './context/UserContext.tsx';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


//  initializeApp(config.firebaseConfig)//just once

 export const app = initializeApp(config.firebaseConfig)
 export const auth = getAuth(app);
 export const db = getFirestore(app);


//https://www.youtube.com/watch?v=b_52NmIfDr8  5: 31
//aktualne
//customhokk https://www.youtube.com/watch?v=tMpn7oUsNGA

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {

//const [isUser, setIsUser] = useContext(false)
  
  return (
 
    <BrowserRouter>
    <UserContextProvider>
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
    </UserContextProvider>
</BrowserRouter>


  )
}

export default Application;


