import { useFetchDates } from "../hooks/useFetchDates";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import { toNamespacedPath } from "path/win32";
import is from "date-fns/esm/locale/is/index.js";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";

export interface IDisplayUserDataUser{

}
 

export const DisplayUserDataUser : React.FunctionComponent<IDisplayUserDataUser> =(props) => {
   
  const [debt, setDebt] = useState<number | null>(null); 
  const [add, setAdd] = useState<number | null>(null); 
const [name, setName] = useState<string | null>(null);
const [surname, setSurname] = useState<string | null>(null);
const [isMulti, setIsMulti] = useState<boolean>(false);
const [isPass, setIsPass] = useState<boolean>(false);
const [isPause, setIsPause] = useState<boolean>(false);
const [isStop, setisStop] = useState<boolean>(false);
const [due, setDue] = useState<Date | null>(null);
const [rendered, setRendered] =   useState(false);

const { currentUser} = useContext(UserContext); 
const dzisIndex = useSearchIndexCloseToday();
const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);

    useEffect(() => {
        const timer = setTimeout(() => {
          setRendered(true);
        }, 1000); // 1000 milisekund = 1 sekunda
      
        return () => {
          clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
        };
      }, []);

    const getUserDatafromBase = useCallback(async () => {
      
        if(currentUser){  
              
          const userRef = doc(db, "usersData",currentUser.uid);
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {

                        //name
                        if(docSnap.data().name){

                            setName(docSnap.data().name)
                        }

                      //multi
              if(docSnap.data().optionMulti === true){
               // console.log("optionMulti",docSnap.data().optionMulti === true)
                  setIsMulti(true)
          
              }
              //pass
              if(docSnap.data().optionPass === true){
               // console.log("optionPass",docSnap.data().optionPass === true)
                  setIsPass(true)
              }
              //debt
              if(docSnap.data().debt){
                  setDebt(null)
              }
              //add
              if(docSnap.data().add){
                  setAdd(null)
              }

              if(docSnap.data().due){
                  setDue(docSnap.data().due)
              }
              //pause
              //stop
              //duedate
             }

          }
    

    }, [currentUser,db,rendered]);
    
    useEffect(()=>{
        getUserDatafromBase();
        console.log("curr", currentUser?.email, "name",name, "multi",isMulti)
      },[getUserDatafromBase])


    return (<>

   {!isStop && !isPause && <p>status aktywny</p>}
  
    {isMulti && <div>
        <p>uzytkownik multi</p>
          {isPause && 
             <div>uzytkownik kontuzjowany
              {debt && <p>zadłużenie {debt}treningów</p>}
              {add && <p>do dodania: {add} treningów</p>}
              </div>
            }
          {isStop && 
          <div>uzytkownik zastopowany
            { debt && <p>zadłużenie {debt}treningów</p>}
          </div>
          }
    </div>}


    {isPass &&  <div>
       <p>uzytkownik karnetu</p>
         {due && <p>należna płatnośc {due?.toDate().toString()}</p>}
         {paymentDateIndex < dzisIndex ? <p>zadłuzenie: {dzisIndex -paymentDateIndex} treningów</p> 
         :<p>nie ma zadłużenia</p> }
       </div>}

    </>)

}
