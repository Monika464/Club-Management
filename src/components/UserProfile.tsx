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

export interface IUserProfile {};   


export const UserProfile : React.FunctionComponent<IUserProfile > =(props) => {


  const [name, setName] = useState<string | null>('');
  const [naszeMetaUid, setNaszeMetaUid]= useState<string | null>('');


  const { currentUser} = useContext(UserContext);
    const storage = getStorage();
 
  //  console.log('uuidv4',uuidv4())

    const [imageUpload, setImageUpload] = useState<any | null>(null);
   // const [imageUrls, setImageUrls] = useState<any | null>([]);
    const [imageUrl, setImageUrl] = useState<string[] | null>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false)

    const [img, setImg] = useState<string | null>('')
    const [email, setEmail] = useState("")

 console.log('naszeMetaUid',naszeMetaUid)
 console.log('currentUserPhoto',currentUser?.photoURL)
  


const handleName = () =>{  
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  //to powinno zapisywac w profilu
 console.log("czesc", name)
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

  const handleToStorage=()=>{

    /*
    //const path = `files/${uuidv4()}`;
    const path = `files/${img?.name}`
   */
    const path = `files/${currentUser?.uid}`
    const userId = currentUser?.uid;
    const metadata = {
      customMetadata: {
        user: userId,
        disabled: 'false'
      },
    };
//console.log("currentUser", currentUser)    
   const imgRef = ref(storage,path)
   uploadBytes(imgRef,img, metadata)
  }



    const updatingAvatar =  async ()=>{

       const auth = getAuth();
       const user: User | null = auth.currentUser;
   
       if (!user) {
        return;
      }

       await handleToStorage();  

       getDownURL();

       await naszeMetaUid;
       
if(naszeMetaUid === user?.uid){
  updateProfile(auth.currentUser, {
    // displayName: name,
     photoURL: imageUpload
   }).then(() => {
     console.log("Profile updated")
     // Profile updated!
     // ...
   }).catch((error) => {
     // An error occurred
     console.error(error)
     // ...
   });

}

  

    }  

  
  ///



 
     const getDownURL = async () => {
       if(currentUser && storage){
       const imageRef  = ref(storage, `files/${currentUser?.uid}`); // Przekaz ścieżkę do obiektu w Storage
       //const mojUrl = await imageRef; 
       const mojUrl = await getDownloadURL(imageRef);
       setImageUpload(mojUrl);
       console.log("mojUrl",mojUrl )
// Get metadata properties
      getMetadata(imageRef)
      .then((metadata) => {
        console.log("metadata", metadata?.customMetadata?.user)
        if(metadata){
          setNaszeMetaUid(metadata.customMetadata.user)
        }
    
      })
       .catch((error) => {
        console.error(error)
    // Uh-oh, an error occurred!
  });

       } 
     }
     

   console.log("currentUser",currentUser?.displayName,currentUser?.email,currentUser?.displayName,currentUser?.uid );
//

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

    }

    return(<>
    {/*<img src={imageUrl} style= {{width: 80 }} alt="awatar"/>*/}
     UserProfile
      <ul>
   <li className="logo">
   
     <div className="title">Cześć {auth.currentUser?.displayName}</div> 
     <img src={currentUser?.photoURL} style= {{width: 80 }} alt="awatar" />
   </li>

   <button onClick={handleEdit}>Edit profile</button>
   </ul>
{isEdited && 
<ul>

  
   <li>
   <p>Change name</p>
      <input
   type="text"
    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)  
         }
        }  
   />
<button onClick ={handleName}>Update of name</button>
<br></br>
    <p>Change photo</p>
  
   <input 
      type="file"  
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      setImg(e.target.files[0])
      }}  
       />
   </li>
   <li>
   {/*<button onClick ={handleClick}>Upload photo</button> */}
   <button onClick={updatingAvatar}>Update your avatar</button>
   </li>
   <p>Before changing email logout and login again</p>
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
