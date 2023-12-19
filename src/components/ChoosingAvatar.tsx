export interface IChoosingAvatar {}


 
import { db, storage } from '../App.tsx';
import { useCallback, useContext, useEffect, useState } from 'react'
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
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ChoosingAvatar = (props: IChoosingAvatar) => { 

    const [thumbnail, setThumbnail] = useState<null | string >(null)
    const [thumbnailError, setThumbnailError] = useState<string | null>(null)
    const [pictureURL, setPictureURL] = useState<string | null>(null)
    const [url,setUrl] =  useState<string | null>(null)
    const [avatarChanged, setAvatarChanged] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { currentUser} = useContext(UserContext); 
    const navigate = useNavigate();

    const [mod0, setMod0] = useState(false);
    const [mod1, setMod1] = useState(false);
    const [mod2, setMod2] = useState(false);
    const [mod3, setMod3] = useState(false);
    const [mod4, setMod4] = useState(false);
    const [mod5, setMod5] = useState(false);
    const [mod6, setMod6] = useState(false);
    const [mod7, setMod7] = useState(false);

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
            uploadFile();


          },[thumbnail])

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
        .then(() => {
          navigate('/userpanel', { replace: true });
        })    
        .catch((error) => {
        console.log(error);
        });
        }
        
       
// dorobic tutaj przeładowanie strony
    }
    updateAvatar()
  },[url])

useEffect(()=>{

  
  const updateAvatar2 =async ()=>{
    if(currentUser){
    const userRef = doc(db, "usersData",currentUser?.uid);
    await updateDoc(userRef, {
      avatar: url
      })
      .then(()=> {console.log("new avatar set")})
    }
  }

  updateAvatar2();
 
},[url])


    return (<div>
     
     <img 
     src={wojownik0} 
    //  style= {{width: 40 }} 
    style={{ 
      width: isHovered ? 80 : 40, 
      filter: mod0 ? 'blur(80px)' : 'none',
    }}
     alt="awatar" 
     onClick={(e) => {
        setThumbnail("wojownik0.png")
        setMod0(true)
      }}
      // onMouseOver={() => setIsHovered(true)}
      // onMouseOut={() => setIsHovered(false)}
 
      />
     <img 
     src={wojownik1} 
     style={{ 
      width: isHovered ? 80 : 40 ,
      filter: mod1 ? 'blur(80px)' : 'none',
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("wojownik1.png");
      setMod1(true)
    }}
    // onMouseOver={() => setIsHovered(true)}
    // onMouseOut={() => setIsHovered(false)}
     />

     <img src={wojownik2} 
    style={{ 
      width: isHovered ? 80 : 40,
      filter: mod2 ? 'blur(80px)' : 'none', 
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("wojownik2.png");
      setMod2(true)
    }}
    // onMouseOver={() => setIsHovered(true)}
    // onMouseOut={() => setIsHovered(false)}
     />

     <img 
     src={samuraj1} 
     style={{ 
      width: isHovered ? 80 : 40,
      filter: mod3 ? 'blur(80px)' : 'none', 
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("samuraj1.png")
      setMod3(true)
    }}
    // onMouseOver={() => setIsHovered(true)}
    // onMouseOut={() => setIsHovered(false)}
     />


     <br></br>
     <img 
     src={samuraj2} 
     style={{ 
      width: isHovered ? 80 : 40,
      filter: mod4 ? 'blur(80px)' : 'none', 
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("samuraj2.png")
      setMod4(true)
    }}
    // onMouseOver={() => setIsHovered1(true)}
    // onMouseOut={() => setIsHovered1(false)}
     />
     <img 
     src={elfka} 
     style={{ 
      width: isHovered ? 80 : 40,
      filter: mod5 ? 'blur(80px)' : 'none', 
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("elfka.png")
      setMod5(true)
    }}
    // onMouseOver={() => setIsHovered1(true)}
    // onMouseOut={() => setIsHovered1(false)}
     />
     <img 
     src={elf} 
     style={{ 
      width: isHovered ? 80 : 40,
      filter: mod6 ? 'blur(80px)' : 'none', 
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("elf.png")
      setMod6(true)
    }}
    // onMouseOver={() => setIsHovered1(true)}
    // onMouseOut={() => setIsHovered1(false)}
     />
     <img 
     src={mag} 
     style={{ 
      width: isHovered ? 80 : 40,
      filter: mod7 ? 'blur(80px)' : 'none', 
    }}
     alt="awatar" 
     onClick={(e) => {
      setThumbnail("mag.png")
      setMod7(true)
    }}
    // onMouseOver={() => setIsHovered1(true)}
    // onMouseOut={() => setIsHovered1(false)}
     />
   <br></br>
   {/* <button onClick={uploadFile}>Upload</button> */}

   {avatarChanged && <p>Avatar wgrany</p>}
    </div>)

}



export default ChoosingAvatar