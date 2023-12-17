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


export interface IUserProfile {};   


export const UserProfile : React.FunctionComponent<IUserProfile > =(props) => {


  const [name, setName] = useState<string | null>('');
  const [naszeMetaUid, setNaszeMetaUid]= useState<string | null>('');
  const [thumbnail, setThumbnail] = useState<File | null | string | any>(null)
  const [thumbnailError, setThumbnailError] = useState<string | null>(null)
  const [pictureURL, setPictureURL] = useState<URL | null>(null)


  const { currentUser} = useContext(UserContext);
    const storage = getStorage();

  
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

//   const handleToStorage=()=>{

//     /*
//     //const path = `files/${uuidv4()}`;
//     const path = `files/${img?.name}`
//    */
//     const path = `files/${currentUser?.uid}`
//     const userId = currentUser?.uid;
//     const metadata = {
//       customMetadata: {
//         user: userId,
//         disabled: 'false'
//       },
//     };
// //console.log("currentUser", currentUser)    
//    const imgRef = ref(storage,path)
//    uploadBytes(imgRef,img, metadata)
//   }



//     const updatingAvatar =  async ()=>{

//        const auth = getAuth();
//        const user: User | null = auth.currentUser;
   
//        if (!user) {
//         return;
//       }

//        await handleToStorage();  

//        getDownURL();

//        await naszeMetaUid;
       
// if(naszeMetaUid === user?.uid){
//   updateProfile(user, {
//     // displayName: name,
//      photoURL: imageUpload
//    }).then(() => {
//      console.log("Profile updated")
//    })
//    .then(() => {
//     alert("Photo updated. Refresh the page")
//     // Profile updated!
//     // ...
//   })
//    .catch((error) => {
//      // An error occurred
//      console.error(error)
//      // ...
//    });

// }

  

//     }  

  
  ///



 
//      const getDownURL = async () => {
//        if(currentUser && storage){
//        const imageRef  = ref(storage, `files/${currentUser?.uid}`); // Przekaz ścieżkę do obiektu w Storage
//        //const mojUrl = await imageRef; 
//        const mojUrl = await getDownloadURL(imageRef);
//        setImageUpload(mojUrl);
//        //console.log("mojUrl",mojUrl )
// // Get metadata properties
//       getMetadata(imageRef)
//       .then((metadata) => {
//         console.log("metadata", metadata?.customMetadata?.user)
//         if(metadata){
//           setNaszeMetaUid(metadata.customMetadata.user)
//         }
    
//       })
//        .catch((error) => {
//         console.error(error)
//     // Uh-oh, an error occurred!
//   });

//        } 
//      }
     



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

User Profile
      <ul>
   <li className="logo">
   
     <div className="title">Cześć {auth.currentUser?.displayName}</div> 
     <img src={auth.currentUser?.photoURL} style= {{width: 80 }} alt="awatar" />

   </li>

   <button onClick={handleEdit}>Edit profile</button>
   </ul>
   <br></br>
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
    </li>
<button onClick ={handleName}>Update of name</button>
<br></br>
   

     {/* nowy */}
     <br></br>
<li>
  Zmień awatar 
  <br></br><br></br>
Wybierz z dostępnych  
<ChoosingAvatar/>
     <SetAvatar
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        thumbnailError ={thumbnailError}
        setThumbnailError = {setThumbnailError}
        pictureURL ={pictureURL}
        setPictureURL={setPictureURL}
        />
  <br></br><br></br>

  </li>
  


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
