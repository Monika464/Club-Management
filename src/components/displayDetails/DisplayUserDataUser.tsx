import { useFetchDates } from "../../hooks/useFetchDates";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useSearchIndexCloseToday } from "../../hooks/useSearchIndexCloseToday";
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../App";
import { toNamespacedPath } from "path/win32";
import is from "date-fns/esm/locale/is/index.js";
import { useSearchDatesPlusN } from "../../hooks/useSearchDatesPlusN";
import './displayUserDataUser.css'
import { format } from "date-fns";
export interface IDisplayUserDataUser{

}
 

export const DisplayUserDataUser : React.FunctionComponent<IDisplayUserDataUser> =(props) => {
   
  const [debt, setDebt] = useState<number | null>(null); 
  const [add, setAdd] = useState<number | null>(null); 
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
      
      console.log('paymentDateIndex',paymentDateIndex, "dis index",dzisIndex )
        if(currentUser){  
              
          const userRef = doc(db, "usersData",currentUser.uid);
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {


                      //multi
              if(docSnap.data().optionMulti === true){
               // console.log("optionMulti",docSnap.data().optionMulti === true)
                  setIsMulti(true)
           console.log("optionMulti",isMulti)
              }
               //pass
              if(docSnap.data().optionPass === true){
               // console.log("optionPass",docSnap.data().optionPass === true)
                  setIsPass(true)
              }
              //debt
              if(docSnap.data().debt){
                console.log("czy tu jest debt",docSnap.data().debt)
                  setDebt(docSnap.data().debt)
              }
            
              //add
              if(docSnap.data().add){
                  setAdd(docSnap.data().add)
              }

              //due
              if(docSnap.data().due){
                  setDue(docSnap.data().due)
              }
              //pause
              if(docSnap.data().pause){
                setIsPause(true)
            }

              //stop
              if(docSnap.data().stop){
                setisStop(docSnap.data().stop)
              }
             
             }

          }
    

    }, [currentUser,db,rendered]);
    
    useEffect(()=>{
        getUserDatafromBase();
        console.log("current user", currentUser?.email, "multi",isMulti, isPause,
      "add",add)
        console.log("debt", debt)
        paymentDateIndex < dzisIndex ? console.log('zzzadłuzenie:' , dzisIndex -paymentDateIndex, 'treningi') 
        :console.log("nie ma zadluzenia")
   
      },[getUserDatafromBase])


      return (<>

      {/*uzytkownik multi */}
      {isMulti && <>
   
      {debt && <div className="debt">
              <p> zadluzenie {debt} treningów</p>
       </div>}
      <div></div>
      </>}
      {/*uzytkownik pass*/}
      
      {isPass && <>
     
             {(isPause || isStop) && <>
                   {debt && <div className="debt">
                    <p> zadluzenie {debt} wejść</p>
                   </div>}
               </>}
              {isPause && <>
                {add && <p>dodatkowo: {add} wejścia</p>}
                 </>}
      </>}
        { (!isPause && !isStop && !isMulti) && <div>
         {(paymentDateIndex < dzisIndex) &&  
        <p className="debt">zadłuzenie: {dzisIndex -paymentDateIndex} wejśc</p> 
         }
        </div>}
      {due && <p>należna płatność {format(due.toDate(), 'dd.MM.yyyy')}</p>}
      {!isStop && !isPause && <div>status aktywny</div>}
      {isStop && <p>członkostwo zatrzymane</p>}
      {isPause && <p>zgłoszona kontuzja</p>}
      {isPass &&  <p>uzytkownik karnetu</p>}
      {isMulti && <p>uzytkownik multi/medicov</p>}
      </>)

  //   return (<>

  //  {!isStop && !isPause && <div>status aktywny</div>}
  // <br></br>
  //   {isMulti && 
  //     <div>
  //        <p>uzytkownik multi</p>
  //         {isPause && <div>uzytkownik kontuzjowany  </div> }
  //             {debt && <div className="debt">
  //             <p> zadluzenie {debt} treningów</p>
  //              </div>}
  //          {add && <p>do dodania: {add} treningów</p>}

  //   </div>}
  //   {isStop && <div>uzytkownik zastopowany

      
  //   </div> }

  //   {isPass &&  
  //   <div>
  //      <p>uzytkownik karnetu</p>
  //      {isPause && 
  //      <div>uzytkownik kontuzjowany  
  //       {debt && <div className="debt">
  //             <p> zadluzenie {debt} treningów</p>
  //              </div>}
  //          {add && <p>do dodania: {add} treningów</p>}
  //      </div> }
        
  //        {due && <p>należna płatność {format(due.toDate(), 'dd.MM.yyyy')}</p>}
  //        {paymentDateIndex < dzisIndex ? <div className="debt">zadłuzenie: {dzisIndex -paymentDateIndex} treningi</div> 
  //        :<p>nie ma zadłużenia</p> }  
  //   </div>}

  //   </>)

}
