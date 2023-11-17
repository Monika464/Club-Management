import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'; 
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../App';
import { useNavigate } from 'react-router-dom';


interface ISigninSending {
    name: string | null,
    surname: string | null,
    dob: Date | null,
    startDay: Date | null,
    option: string | null,
    email: string | null,
    password: string | null    
}

export function SigninSendingTest(props: ISigninSending){

    const navigate = useNavigate();

    const { currentUser} = useContext(UserContext);
    console.log('currentUser',currentUser)

    const [optionMulti, setOptionMulti] = useState<boolean>(false);
    const [optionPass, setOptionPass] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);

    useEffect(()=>{
        console.log('optionoption',props.option)
        if(props.option === "multi"){
        setOptionMulti(true)
        setOptionPass(false)
        console.log('optionMulti  true')
         }
        if(props.option === "pass"){
        console.log('optionPass true')
        setOptionPass(true)
        setOptionMulti(false)
    }
    },[props.option])
   

  

 

  

    //useEffect(()=>{
    

   // },[props.option])

   


    const WriteUserInfo = async() =>{ 

        console.log("przycisk wcisniety")
  	    
        if (!db) {
    		  console.error('Firebase Firestore is not initialized yet');
   		   return;
    		}

    if(currentUser){

           //jesli option pass a inny jesl option multi
if(optionMulti){
    const docRef = doc(db, "usersData", currentUser.uid);
    await setDoc(docRef, {
      name: props.name,
      surname: props.surname,
      dob: props.dob,
      id: currentUser?.uid, 
      start: props.startDay,
      due: null,
      optionPass: false,
      optionMulti: true
      })
      .then(()=>console.log("multi user. update succesful"))
              .then(()=>  setIsSent(true))
              .catch((err)=> console.error(err))

    }

    if(optionPass){
        const docRef = doc(db, "usersData", currentUser.uid);
        await setDoc(docRef, {
          name: props.name,
          surname: props.surname,
          dob: props.dob,
          id: currentUser?.uid, 
          start: props.startDay,
          due: props.startDay,
          optionPass: optionPass,
          optionMulti: false
          })
          .then(()=>console.log("pass user. update succesful"))
                  .then(()=>  setIsSent(true))
                  .catch((err)=> console.error(err))

    }
      
   

        }
    }

   // useEffect(()=>{
        console.log("z komponentu SigninSendingTest",props.name, props.surname,props.dob,"hej", props.option,props.email,props.password)
        //trzeba wyslac do bazy


   // },[props.name])

return(<div>
    
    <button onClick={WriteUserInfo}>accept and send</button>
    {isSent && <p>uzytkownik zapisany w bazie</p>}


</div>)
}

