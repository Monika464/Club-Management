//https://www.youtube.com/watch?v=YOAeBSCkArA
//jednak to: https://www.youtube.com/watch?v=5986IgwaVKE&t=22s
//7:55
//teraz to  https://www.youtube.com/watch?v=Frtvnb4gaHs&t=32s

//admin: https://www.youtube.com/watch?v=SSiLsIkPQWs&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=17

//nnja: https://www.youtube.com/watch?v=SSiLsIkPQWs&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=18

import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import Temple from './../assets/temple.svg'
import Avatar from './../assets/avatar.png'
import { EmailAuthProvider, User, getAuth, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, getMetadata, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../App';
import SetAvatar from './SetAvatar';
import ChoosingAvatar from './ChoosingAvatar';
import { useNavigate } from 'react-router-dom';


export interface IUserProfile {};   


export const UserProfile : React.FunctionComponent<IUserProfile > =(props) => {


  const [name, setName] = useState<string | null>('');
  const [naszeMetaUid, setNaszeMetaUid]= useState<string | null>('');
  const [thumbnail, setThumbnail] = useState<File | null | string | any>(null)
  const [thumbnailError, setThumbnailError] = useState<string | null>(null)
  const [pictureURL, setPictureURL] = useState<URL | null>(null)


  const { currentUser} = useContext(UserContext);
    const storage = getStorage();
    const navigate = useNavigate();
  
  //console.log('currentUser',currentUser)

  //console.log('auth.currentUserprofil', auth.currentUser)
  //console.log('currentUserProfilphoto', currentUser?.photoURL)  

    const [imageUpload, setImageUpload] = useState<any | null>(null);
   // const [imageUrls, setImageUrls] = useState<any | null>([]);
    const [imageUrl, setImageUrl] = useState<string[] | null>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false)

    const [img, setImg] = useState<string | null>('')
    const [email, setEmail] = useState("")

 //console.log('naszeMetaUid',naszeMetaUid)
 //console.log('currentUserPhoto',currentUser?.photoURL)
  
//dpisz navigate to userpanel po wszystkich updatach

const handleName = () =>{  
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  //to powinno zapisywac w profilu
 //console.log("czesc", name)
    updateProfile(auth.currentUser, {displayName: name})
      .then(() => {
        console.log("Your name was updated")
      // Profile updated!
       // ...
       }).catch((error) => {
       // An error occurred
        console.error(error)
       // ...
       });
  }


    const updatingEmail = async ()=>{
        await updateEmail(auth.currentUser, email).then(() => {
        alert("Email updated!")
        // ...
      }).catch((error) => {
        alert("musisz się wylogowac i zalogowac ponownie")
       console.error(error)
        // ...
      });
  // ...
       }

   

    

    const [password, setPassword] = useState("");

    const updatingPassword =()=>{
      const auth = getAuth();

      const user = auth.currentUser;
      const newPassword = password;
      
      updatePassword(user, newPassword).then(() => {
       alert("Password update successful")
      }).catch((error) => {
        alert("musisz się wylogowac i zalogowac ponownie")
        console.error(error)
        // ...
      });
    }

   console.log('isEdited',isEdited)
    const handleEdit =()=>{
      setIsEdited(!isEdited)
      //navigate('/userpanel')
    }




    return(<>


      <ul>
         <li className="logo">
          <div className="title">Cześć {auth.currentUser?.displayName}</div> 
          <img src={auth.currentUser?.photoURL} style= {{width: 80 }} alt="awatar" />
         </li>

         <button onClick={handleEdit}>
         {isEdited ? 'Zamknij' : 'Edytuj profil'}
          </button>
  
     </ul>
     <br></br>
      
      {isEdited && 
    <ul>  
<li>
  Wgraj własny avatar i przeaładuj stronę
     <SetAvatar
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        thumbnailError ={thumbnailError}
        setThumbnailError = {setThumbnailError}
        pictureURL ={pictureURL}
        setPictureURL={setPictureURL}
        />
        <br></br>
      Albo wybierz jeden z dostępnych
        <ChoosingAvatar/>
     <br></br><br></br>

  </li>





       <li>
          
          <p>Change name</p>
            <input
            type="text"
    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)  
         }
        }  
   />
    </li>
<button onClick ={handleName}>Update of name</button>
<br></br>
   

     {/* nowy */}
     <br></br>

  


   <li>
   <p>Change email</p>
   <input 
      type="email"  
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
      }} 

       />

<button onClick={updatingEmail}>Update your email</button>

   </li>
   <li>
   <p>Change password</p>
   <input 
      type="password"  
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
      }}  
       />

<button onClick={updatingPassword}>Update password</button>
   </li>
   </ul>
  
 
  }



    <br></br>
    
    </>
    )
}
