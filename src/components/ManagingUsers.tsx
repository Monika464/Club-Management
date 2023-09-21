export interface ImanagingUsers {};   
import { useEffect, useState } from "react"; 
import { useFetchUsers } from "../hooks/useFetchUsers"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "../App.tsx";

export const ManagingUsers : React.FunctionComponent<ImanagingUsers> =(props) => {

    const [closeMenu, setCloseMenu] = useState<boolean>(false);
    const[userChoice, setUserChoice] = useState<Date[]>([])
    const [usersModForSelect, setUsersModForSelect] = useState([{}])


    const {usersInfo,loadingUsers, loadingDB} = useFetchUsers();
    //fetch zrobic tutaj

    
    const animatedComponents = makeAnimated();

   
    const temp1 =[{}]
    useEffect(()=>{

      console.log("tu managing users", usersModForSelect)
      console.log("loadingDB", loadingDB)
  
           
            if(usersInfo)
           
            usersInfo.forEach((el)=>{
          //console.log("ell",el)
          let nameSurnameAge =  el.name + " "+ el.surname +" "+ el.dob; 
          //console.log(" nameSurnameAge",  nameSurnameAge)
          temp1.push({ value: el.id, label: nameSurnameAge})  
          //console.log("temp1",temp1)
         
        })
        setUsersModForSelect(temp1);
          
    },[])
    
  const handleEditUser=async()=>{  
    
    console.log("wybrany id",userChoice.value)
    //const costam = "Y19J2pywqfd2YKN3zVVGlzYEWR82";
    const costam = userChoice.value;
 
    //const mielenie =async ()=>{ 

      const docRef = doc(db, "usersData", costam);
      const docSnap = await getDoc(docRef); 

      if (docSnap.exists()) { 
        console.log("Document data:", docSnap.data().due);
        const lastpay = docSnap.data().due;
        console.log("lastpay",lastpay);  
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
  }
  //mielenie()

  //}

  const handlePayment=()=>{

  }

 


    return(<>

    managingUsers
    {loadingUsers && <p>loading...</p>}

    <Select
      closeMenuOnSelect={closeMenu}  
      components={animatedComponents} 
      isClearable
      options={usersModForSelect}
      onChange={(choice) => {
        setUserChoice(choice);    
        }}   
    />
    <p>{userChoice.label}</p>

    <button onClick={handleEditUser}>Edit</button>
<br></br>
<br></br>
    Edycja wybranego usera {userChoice.label}

    <input onChange={handlePayment} type="text"  placeholder="name"/>





    </>)
}


//usersInfo.forEach((elem)=>{console.log("ludz",elem)})
    /*
    to jest wuswietlanie zaleznie od pass
    useEffect(()=>{       
    
       console.log("usersInfoManaging",usersInfo)
       if(usersInfo){
        usersInfo?.map((userinfo: { passmembership: boolean; })=>{console.log(userinfo.passmembership)})
        const passmembers = usersInfo.filter((userinfo: { passmembership: boolean; }) => userinfo.passmembership === true);
        console.log('result', passmembers)
        const entrymembers = usersInfo.filter((userinfo: { passmembership: boolean; }) => userinfo.passmembership === false);
        console.log('entrymembers', entrymembers)

       }
      // usersInfo?.map((userinfo)=>{console.log(userinfo.passmembership)})
       //const result = words.filter((word) => word.length > 6);
         
    },[useFetchUsers])
*/
    //zrob cis do pobierania 