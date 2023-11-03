import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../App";
import Switch from "react-switch";
//dopisz timera ktory powoduje ze strona odswieza sie po 3 sekundach

export interface US {
    name: string | null
    surname: string | null
    dob: Date | null
    due: Date | null
    pause: Date | null
    stop: Date | null

}

const AttendanceList: React.FunctionComponent =() => {


    const [multiUsers,setMultiusers ] = useState([]);
const [activeUsersList, setActiveUserList] = useState([]);
const [notActiveUsersList, setNotActiveUserList] = useState([]);
const [onToOffList, setOnToOffList]= useState([]);
const [usersIdsToBase, setUsersIdsToBase] = useState("");
const [rendered, setRendered] = useState(false);
const [isSend, setisSend] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setRendered(true);
  }, 1000); // 1000 milisekund = 1 sekunda

  return () => {
    clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
  };
}, []);


 


    useEffect(() => { 
        const usersRef = collection(db, "usersData");
        const q = query(usersRef, where("optionMulti", "==", true));

        const takingQuery = async()=>{

            const querySnapshot = await getDocs(q);
            const tempList: any =[];
            const tempActiveList: any =[]
            const tempNonActiveList: any =[]

            querySnapshot.forEach((doc) => {
          
                    const userData = doc.data();
                       
                    tempList.push({ ...userData, checked: true }); 
                    console.log("name", doc.data().name,doc.data().surname );

                      if(doc.data().due){
                        tempActiveList.push(doc.data()) 
                      }

                     if(doc.data().pause || doc.data().stop){
                        tempNonActiveList.push(doc.data())
                       console.log("pause",doc.data().pause, doc.data().name)     
                       }

                     
            });



              // Zaktualizuj 'checked' dla użytkowników w notActiveUsersList
  const notActiveUserIds = notActiveUsersList.map((user) => user.id);
  const updatedUsers = tempList.map((user) => {
    if (notActiveUserIds.includes(user.id)) {
      return { ...user, checked: false }; 
    }
    return user;
  });

            setMultiusers(updatedUsers);
            setNotActiveUserList(tempNonActiveList);
            setActiveUserList(tempActiveList);


        }
        takingQuery(); 
       
        console.log('multiUsers',multiUsers);
        console.log('activeUsersList',activeUsersList)
        console.log('notActiveUsersList',notActiveUsersList) 
      
     
    },[db,rendered])


  const handleUserButtonClick = (userId: string) => { 
    const updatedUsers = multiUsers.map((user) => {
      if (user.id === userId) {
        const updatedUser = { ...user, checked: !user.checked };
        // Sprawdź, czy użytkownik jest z activeUsersList i czy przycisk zmienia się z "on" na "off"
            if (activeUsersList.some((activeUser) => activeUser.id === userId) && user.checked) {
            setOnToOffList((prevList) => [...prevList, updatedUser]);
             } else {
             // Przełącz z "off" na "on" i usuń z onToOffList
             setOnToOffList((prevList) => prevList.filter((item) => item.id !== userId));
            }


          return updatedUser;
        } else {
          return user;
         }
      });
    setMultiusers(updatedUsers); 
  };
  
  console.log('onToOffList',onToOffList)
  //jak liczba parzysta uzytkownika to usun a jak nieparzysta

  useEffect(()=>{
    const justUsersIds = ()=>{

      const tempUserIds = []
      onToOffList.map((user)=>{
          console.log("in oftoOn", user.id)
          tempUserIds.push(user.id) 
      })
          return setUsersIdsToBase(tempUserIds)
  
    }
    justUsersIds();  

console.log('usersIdsToBase',usersIdsToBase)

  },[onToOffList])



useEffect(()=>{
  const prepareReport =()=>{
    if(onToOffList){
      onToOffList.map((user)=>{
        console.log("tym userom zostanie zapisany dług",user?.name, user?.surname)
        //powyzsze wyswietl i przycisk potwierdz
       
        
      })
    }
  }
  prepareReport(); 
},[onToOffList])
  

  

const sendConfirmedReport = async()=>{  
 
 //zapytaj czata jak wykonac kilka roznyh update dla roznych ids
if(onToOffList){

  onToOffList.map((user)=>{

    
         const debt: number | null = user.debt;

         if(user.debt === (null || undefined)){
          const userRef = doc(db, "usersData",user.id);
          updateDoc(userRef, {  
           debt: 1
         })
         .then(()=>{
          console.log("zadluzenie zapisano1")
          setisSend(true);
        })
 
         } else{  
          const userRef = doc(db, "usersData",user.id);
          updateDoc(userRef, {  
           debt: debt + 1
         })
         .then(()=>{
          console.log("zadluzenie zapisano2")
          setisSend(true);
        })
         }

       
     
  })

}
}
  


console.log('usersIdsToBase',usersIdsToBase)


    return (<div>  

      
        Multi/medic Users
               {multiUsers && multiUsers.map((user)=> (
                  <div key={user.id}>
                  <p>{user.name} {user.surname}</p>
    
                     <Switch
                      onChange={() => handleUserButtonClick(user.id)}
                       checked={user.checked}
                       className="react-switch"
                       id={`user-${user.id}`}
                       />
                    <p>
                    The switch is <span>{user.checked ? `${user.name} on` : `${user.name} off`}</span>
                    </p>

                   </div>
              ))}
<br></br><br></br>
              Tym userom zostanie dopisany dług
              {onToOffList && <div>{onToOffList.map((elem)=>(
              <div key={elem.id}>
              <p>{elem.name} {elem.surname}</p>
              </div>
              ))}
              </div>}
              <button onClick={sendConfirmedReport}>Potwierdzam </button>
            <br></br>
            {isSend && <p>Zadluzenie zapisano</p>}
         
        
        
        </div>)
}

export default AttendanceList