import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'; 
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../App';

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

    const { currentUser} = useContext(UserContext);
    console.log('currentUser',currentUser)

    const [optionMulti, setOptionMulti] = useState<boolean>(false);
    const [optionPass, setOptionPass] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);

    useEffect(()=>{
        console.log('optionoption',props.option)
        if(props.option === "multi"){
        setOptionMulti(true)
        console.log('optionMulti  true')
         }
        if(props.option === "pass"){
        console.log('optionPass true')
        setOptionPass(true)
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
        const docRef = doc(db, "usersData", currentUser.uid);

      await setDoc(docRef, {
        name: props.name,
        surname: props.surname,
        dob: props.dob,
        id: currentUser?.uid, 
        start: props.startDay,
        due: props.startDay,
        optionPass: optionPass,
        optionMulti: optionMulti
        })
        .then(()=>console.log("debt modified. update succesful"))
                .then(()=>  setIsSent(true))
                .catch((err)=> console.error(err))
        
       // setIsName(true);
        //setIsSurname(true);
        //setIsDob(true);
        //setIsStart(true);

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

