// export interface Itest{}

// import { useEffect, useState } from "react";
// import { useModDatesForSelect } from "../hooks/useModDatesForSelect";
// import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
// import Select from 'react-select'
// import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { db } from "../App";
// import { useSearchIndexAnyDate } from "../hooks/useSearchIndexAnyDate";
// import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
// import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
// export const BackAfterInjury : React.FunctionComponent<Itest> =(props) => { 


//   const [chosenUserId, setChosenUserId] = useState<string | null>(null)
//   const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null)
//   const [chosenDateReturn, setChosenDateReturn] = useState<Date | null>(null) ;
// const [treningsToAdd, setTreningsToAdd] = useState<number | null>(null) ;
// const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>()

//     const datesModForSelect = useModDatesForSelect(); 
//     const userModForSelect  =  useModUsersForSelect(); 
//     const dzisIndex = useSearchIndexCloseToday();
//     const dzisData = useSearchDatesByIndex(dzisIndex);


//     console.log("treningsToAdd", treningsToAdd);
//     const indexDatyPowrotu = useSearchIndexAnyDate(chosenDateReturn)

//     console.log("jaka jest wybrana data powrotu", chosenDateReturn);
//     if(currentUserPausaDate){
//     console.log("data od kiedy user pauzuje", currentUserPausaDate?.toDate());
//   }
  
//     const calcDatOfNewPay =  useSearchDatesByIndex(indexDatyPowrotu + treningsToAdd)
//     if(calcDatOfNewPay){
//     console.log("calcDatOfNewPay", calcDatOfNewPay?.toDate());
//   }

//   useEffect(()=>{

//     if(chosenUserId){
//     const getAddfromBase =async ()=>{
//       const userRef = doc(db, "usersData",chosenUserId);
//       const docSnap = await getDoc(userRef);
      
//       if (docSnap.exists()) {
//         //console.log("Document data:", docSnap.data().add);
//         setTreningsToAdd(docSnap.data().add) 
//         setCurrentUserPausaDate(docSnap.data().pause)         
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//       }

     
//     }
//     getAddfromBase();

//   }

//   },[db,chosenUserId,indexDatyPowrotu])

  
    
//     //updatuji pchnij calcDatOfNewPay baze wrzuc tam nowa date naleznosci
// const pushToBaseNewDueDay =async ()=>{
  
//   const dataToActivityArchive = {
//     created_at: serverTimestamp(),
//     endPauseData: dzisData,
//     userUid: chosenUserId,
//     kto: `${chosenUserByIdLabel}`         
//     }  


//   const userRef = doc(db, "usersData",chosenUserId);
//   await updateDoc(userRef, {
//     due: calcDatOfNewPay,
//     add: null,
//     pause: null
//   })
//   .then(()=>{console.log("nowa płatnosc zapisana")})

//        //kopia do archive
//      const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
//      .then(()=> console.log("archive"))
    
//      } 


// }

//   return(<>
// <br></br><br></br>
//   Powrót po kontuzji
  
//   <Select
//       closeMenuOnSelect={true}  
//       options={userModForSelect}
//       onChange={(choice) => {
//         setChosenUserId(choice.value);   
//         setChosenUserByIdLabel(choice.label);    
//         }}   
//     />
//     <p>{chosenUserByIdLabel}</p>

//     <Select
//       closeMenuOnSelect={true} 
//       options={datesModForSelect}
//       onChange={(choice) => {   
        
//       if (choice) {
//           const selectedValue = choice.value;
//           setChosenDateReturn(selectedValue);
//         } else {
//           setChosenDateReturn(null); // Opcjonalnie, jeśli chcesz zresetować wybór
//         }
//       }}
//        />

//   {/*<button onClick={getAddfromBase}>Pobierz info ile ma dodatkowych</button>*/}
//   <button onClick={pushToBaseNewDueDay}>Pchnij do bazy nowa paymentdate</button>
  
  
  
//   </>)
// }


