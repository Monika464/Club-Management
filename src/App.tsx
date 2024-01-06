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
import Signup2 from './components/newuserform/Signup2.tsx';
import Create from './pages/Create.tsx';
import Project from './pages/Project.tsx';
import Sidebar from './components/Sidebar.tsx';
import { getStorage } from "firebase/storage";

import { useContext } from 'react'
import { UserContext } from './context/UserContext';
import StopMembershipAdmin from './components/StopMembershipAdmin.tsx';
import Membershipage from './pages/Membershippage.tsx';
import { UsersPayments } from './components/UserPayments.tsx';
import Injurypage from './pages/Injurypage.tsx';
//import Switchmultipass from './pages/Switchmultipass.tsx';
import MembershiUserpage from './pages/MembershipUserpage.tsx';
import InjuryUserpage from './pages/InjuryUserpage.tsx';
import ProjectSingle from './components/project/ProjectSingle.tsx';
import DatePickerpages from './pages/DatePickerpage.tsx';
import Attendancepage from './pages/AttendanceListpage.tsx';
import  ArchiveViewAdmin  from './components/archive/ArchiveViewAdmin.tsx';
import ArchiveViewUser from './components/archive/ArchiveViewUser.tsx';
import ArchiveUserpage from './pages/ArchiveUserpage.tsx';
import ArchiveAdminpage from './pages/ArchiveAdminpage.tsx';
import { Test } from './components/Test.tsx';
import PaymentAdminPage from './pages/PaymentAdminPage.tsx';
import RaportPage from './pages/RaportPage.tsx';
import Profilepage from './pages/Profilepage.tsx';
import Footer from './components/Footer.tsx';
import UserMailbox from './pages/UserMailbox.tsx';
import AdminMailbox from './pages/AdminMailbox.tsx';
import { Test2 } from './components/Test2.tsx';
import DisplayUserDataAdmin from './components/displayDetails/DisplayUserDataAdmin.tsx';
import { RaportUsersPage } from './pages/RaportUserspage.tsx';
import StopActivityPage from './pages/StopActivitypage.tsx';
import Instruction from './pages/Instruction.tsx';
// import PaymentAdminPage from './pages/PaymentAdminPage.tsx';


//  initializeApp(config.firebaseConfig)//just once

 export const app = initializeApp(config.firebaseConfig)
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage();

//https://www.youtube.com/watch?v=b_52NmIfDr8  5: 31
//aktualne
//customhokk https://www.youtube.com/watch?v=tMpn7oUsNGA

export interface IApplicationProps {}



const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const { currentUser} = useContext(UserContext);
//const [isUser, setIsUser] = useContext(false)
  
  return (
 <div className='App'>
    <BrowserRouter>
    
 
        <div className='container'>
       
  
    <UserContextProvider>
    <Navbar/> 
   
   
        <Routes>
        
            <Route 
             path="/" 
             element={
                       <AuthRoute>
                       <HomePage />
                                             
                       </AuthRoute>
                    }
            />

           <Route 
             path="/home" 
             element={   
                             
                       <HomePage />       
                    }
            />

           <Route 
             path="/create" 
             element={
                       <AdminRoute>
                       <Create />                                     
                       </AdminRoute>
                    }
            />

          <Route 
             path="/membershipadmin" 
             element={
                      //  <AuthRoute>
                       <Membershipage/>                                     
                      //  </AuthRoute>
                    }
            />

        <Route 
             path="/paymentadmin" 
             element={
                      //  <AuthRoute>
                       <PaymentAdminPage/>                                     
                      //  </AuthRoute>
                    }
            />

         <Route 
             path="/injuryadmin" 
             element={
                      //  <AuthRoute>
                       <Injurypage/>                                     
                      //  </AuthRoute>
                    }
            />

<Route 
             path="/report" 
             element={
                      //  <AuthRoute>
                      <RaportPage/>                                  
                      //  </AuthRoute>
                    }
            />



<Route 
             path="/usersreport" 
             element={
              <AdminRoute>
                      <RaportUsersPage/>                                  
               </AdminRoute>
                    }
            />


<Route 
             path="/datespicker" 
             element={
              <AdminRoute>
                       <DatePickerpages/>                                     
                       </AdminRoute>
                    }
            />        
        
 <Route 
             path="/attendancelist" 
             element={
              <AdminRoute>
                       <Attendancepage/>                                     
                       </AdminRoute>
                    }
            /> 

    
      <Route 
             path="/archiveadmin" 
             element={
              <AdminRoute>
                <ArchiveAdminpage/>                            
              </AdminRoute>
                }
            />             
        
        
        
        <Route 
             path="/membershipuser" 
             element={
                       <AuthRoute>
                       <MembershiUserpage/>                                     
                       </AuthRoute>
                    }
            />
    <Route 
             path="/injuryuser" 
             element={
                        <AuthRoute>
                       <InjuryUserpage/>                                     
                        </AuthRoute>
                    }
            />


<Route 
             path="/archiveuser" 
             element={
                        <AuthRoute>
                       <ArchiveUserpage/>                                     
                        </AuthRoute>
                    }
            />

<Route 
             path="/mailboxuser" 
             element={
                      //  <AuthRoute>
                       <UserMailbox/>                                     
                      //  </AuthRoute>
                    }
            />

<Route 
             path="/mailboxadmin" 
             element={
                      //  <AuthRoute>
                       <AdminMailbox/>                                     
                      //  </AuthRoute>
                    }
            />
<Route 
             path="/instruction" 
             element={
                      // <AuthRoute>
                       <Instruction/>                                     
                      //  </AuthRoute>
                    }
            />

<Route 
             path="/test" 
             element={
                        <AuthRoute>
                       <Test/>                                     
                        </AuthRoute>
                    }
            />
<Route 
             path="/test2" 
             element={
                      // <AuthRoute>
                       <Test2/>                                     
                      //  </AuthRoute>
                    }
            />

          <Route 
             path="/projects/:id" 
             element={           
                       <ProjectSingle />                                                        
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
              <Route path="signup2" element={
               
                  <Signup2 />
                
              
              }/>

    </Routes>
    {/* <Footer/> */}
    </UserContextProvider>
    </div>
</BrowserRouter>

</div>
  )
}

export default Application;


