import { useEffect, useRef, useState } from "react"  
import { db } from "../App"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'; 
import { doc, getDoc, setDoc } from "firebase/firestore";
//import { ChooseStartDate } from "./ChooseStartDate";  

/*choose*/
import {useFetchDates} from '../hooks/useFetchDates';
import Select from 'react-select'
//import makeAnimated from 'react-select/animated'; 

export interface IwritingUsers { 

  userChoice2: string;
};    

export const WriteUsersInfo : React.FunctionComponent<IwritingUsers> =({userChoice2: userChoice2}) => {
   
  const { currentUser} = useContext(UserContext);
  const data =  useFetchDates();

    const [isName, setIsName] = useState(false);
    const [isSurname, setIsSurname] = useState(false);
    const [isDob, setIsDob] = useState(false);
    const [isDue, setIsDue] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null >(null);
    const [dob, setDob] = useState<Date | null >(null);

    //choose
    const [isStart, setIsStart] = useState<Boolean>(false);
    const[userChoice, setUserChoice] = useState({});
    const [datesModForSelect, setDatesModForSelect] = useState<Date[] | null>([])

    //endofchoos


    useEffect(()=>{

      if(db && data){
          const temp: any[] = []; 
      data.forEach((elem, index) => {
          //console.log("co to za elem",elem)
         const timestampA = elem.toDate().toString()
         temp.push({ value: timestampA, label: timestampA }) 
         setDatesModForSelect(temp);
       //console.log("timestamp",timestampA);   
        }) 
  
      } else {console.log("db still loading")}
console.log("userChoice",userChoice) 
console.log("userChoice2",userChoice2)   

  },[data,db])




    const handleSetName = (event: { target: { value: any; }; })=>{

      setName(event.target.value); 
    }

    const handleSetSurname = (event: { target: { value: any; }; })=>{

      setSurname(event.target.value);
    }

    const handleSetDob = (event: { target: { value: any; }; })=>{

      setDob(event.target.value);
    }

    const handleChoose=()=>{

      console.log("wybor uzytkoewnika",userChoice) 
    }

      const WriteUserInfo = async() =>{ 
  	    
        if (!db) {
    		  console.error('Firebase Firestore is not initialized yet');
   		   return;
    		}

        if(currentUser){
	      const docRef = doc(db, "usersData", currentUser.uid);

        

        await setDoc(docRef, {
          name: name,
          surname: surname,
          dob: dob,
          id: currentUser?.uid, 
          start: userChoice,
          due: userChoice 
          });
  
          setIsName(true);
          setIsSurname(true);
          setIsDob(true);
          setIsStart(true);

      }

      // tu musimy dopisac start date ktora musimy wybrac z dostepnych w bazie dat
      //wyswietl selecta z datami do wboru


        // const docSnapshot = await getDoc(docRef);
        // if (docSnapshot.exists()) { 
         // console.log("Document data:", docSnapshot.data().name);
        // }
/*
  await setDoc(docRef, {
    name: nameRef.current.value,
    surname: surnameRef.current.value,
    dob: dobRef.current.value,
    id: currentActiveUser.uid,  
  });
  */

         console.log("Info about user  created");    
     }
      
   
    

    useEffect(() => {
      const checkFields = async () => { 

            if (!db) {
        console.error('Firebase Firestore is not initialized yet');
        return;
      }
      
     try {

      if(currentUser){
        const docRef =  doc(db, "usersData", currentUser.uid);
       const docSnap = await getDoc( docRef );
   
           if (docSnap.exists()) { 
               console.log("Document data:", docSnap.data().name);
               setIsName(docSnap.data().name !== undefined); 
               setIsSurname(docSnap.data().surname !== undefined);
               setIsDob(docSnap.data().dob !== undefined);
               setIsStart(docSnap.data().start !== undefined);
               //setIsDue(docSnap.data().due !== undefined);
  

          } else {
           // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        }
    } catch (error) {  
      console.error('Error fetching user data:', error);
    }
  };

  checkFields(); 
}, [currentUser,WriteUserInfo]);   




    return ( 
     <div> 
        
       	  {!isName && !isSurname && !isDob && !isStart &&
         	  <p>Update profile</p>}
           
             <div id="fields">

           { !isName &&
           <><input onChange={handleSetName} type="text" placeholder="name" />
           <button className={"btn"} onClick={WriteUserInfo}>update profile</button>
           </>
           }
           {!isSurname &&
           <><input onChange={handleSetSurname} type="text" placeholder="surname" />
           <button className={"btn"} onClick={WriteUserInfo}>update profile</button>
           </>
           }
          { !isDob &&
           <><input onChange={handleSetDob} type="date" placeholder="dob" />
           <button className={"btn"} onClick={WriteUserInfo}>update profile</button>
           </>
           }

            </div>    

  
       { !isStart && <div>    
          <p>Select date of start trainings</p>  
  
         <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
      options={datesModForSelect}
      onChange={(choice) => {     
      if (choice) {
          const selectedValue = choice.value;
          setUserChoice(selectedValue);
        } else {
          setUserChoice(null); // Opcjonalnie, jeśli chcesz zresetować wybór
        }
      }}
       />
     {/*<p>{userChoice}</p>*/}
     {/*<button className={"btn"} onClick={handleChoose}>send</button>*/}
     <button className={"btn"} onClick={WriteUserInfo } >update profile</button>
     </div> }

   


  


     {/*<ChooseStartDate/>*/}
     {/*
ten nizej dziala
  { !isStart && <div>    
  <p>Select date of start trainings</p>  
  
    <Select
      closeMenuOnSelect={true} 
      options={datesModForSelect}
      onChange={(choice) => {     
                    if (choice) {
                   const selectedValue = choice.value;
                   setUserChoice(selectedValue);
                  } else {
                   setUserChoice(null); // Opcjonalnie, jeśli chcesz zresetować wybór
                   }
      }}
    />
     <p>{userChoice}</p>
     {/*<button className={"btn"} onClick={handleChoose}>send</button>*/}
   

  

</div>   )
}
