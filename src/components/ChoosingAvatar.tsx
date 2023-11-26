export interface IChoosingAvatar {}


 
import { storage } from '../App.tsx';
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { updateProfile } from "firebase/auth";
import { uploadBytes,ref as storageRef, getDownloadUR, getDownloadURL } from 'firebase/storage'



import wojownik0 from '../assets/wojownik0.png'
import wojownik1 from '../assets/wojownik1.png'
import wojownik2 from '../assets/wojownik2.png'
import samuraj1 from '../assets/samuraj1.png'
import samuraj2 from '../assets/samuraj2.png'
import elfka from '../assets/elfka.png'
import elf from '../assets/elf.png'
import mag from '../assets/mag.png'

const ChoosingAvatar = (props: IChoosingAvatar) => { 

    const [thumbnail, setThumbnail] = useState<null | string >(null)
    const [thumbnailError, setThumbnailError] = useState<string | null>(null)
    const [pictureURL, setPictureURL] = useState<string | null>(null)
    const [url,setUrl] =  useState<string | null>(null)
    const [avatarChanged, setAvatarChanged] = useState(false);

    const { currentUser} = useContext(UserContext); 

    console.log("thumb",thumbnail)

        const uploadFile = async () => {

         await getDownloadURL(storageRef(storage, `avatars/${thumbnail}`))
          .then((url) => {
         setUrl(url)
           })
          .catch((error) => {
          console.log(error);
           });

           
          }

  useEffect(()=>{

    const updateAvatar =async ()=>{
       if(currentUser){
          updateProfile(currentUser, {
          photoURL: url 
          })
        .then((response) => {
        //console.log("response",response);
        console.log("Profile updated!");
        })     
        .catch((error) => {
        console.log(error);
        });
        }
// dorobic tutaj przeładowanie strony
    }
    updateAvatar()
  },[url])




    return (<div>
     
     <img 
     src={wojownik0} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
        setThumbnail("wojownik0.png")
      }}
      />
     <img 
     src={wojownik1} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("wojownik1.png")
    }}
     />

     <img src={wojownik2} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("wojownik2.png")
    }}
     />

     <img 
     src={samuraj1} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("samuraj1.png")
    }}
     />
     <br></br>
     <img 
     src={samuraj2} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("samuraj2.png")
    }}
     />
     <img 
     src={elfka} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("elfka.png")
    }}
     />
     <img 
     src={elf} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("elf.png")
    }}
     />
     <img 
     src={mag} 
     style= {{width: 40 }} 
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("mag.png")
    }}
     />
   <br></br>
   <button onClick={uploadFile}>Upload</button>

   {avatarChanged && <p>Avatar wgrany</p>}
    </div>)

}



export default ChoosingAvatar