export interface ISetAvatar {
  thumbnail: File | null;
  setThumbnail: React.Dispatch<File | null>
  thumbnailError: string | null
  setThumbnailError: React.Dispatch<React.SetStateAction<string | null>>
  pictureURL: string | null | any
  setPictureURL: React.Dispatch<React.SetStateAction<string | null>>
  // uploadFile: any
};


import { useEffect} from "react"
//import { db } from "../../App.tsx";
import { db, storage } from '../../App.tsx';
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext.tsx';
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
//import { doc, updateDoc } from "firebase/firestore";


const SetAvatar = (props: ISetAvatar) => {

    //const [thumbnail, setThumbnail] = useState<File | null | string | any>(null)
    //const [thumbnailError, setThumbnailError] = useState<string | null>(null)

    const thumbnail = props.thumbnail
    const setThumbnail = props.setThumbnail
    //const thumbnailError = props.thumbnail
    const setThumbnailError = props.setThumbnailError
    const pictureURL = props.pictureURL
    const setPictureURL = props.setPictureURL

    const { currentUser} = useContext(UserContext); 

    const handleFileChange =  (e: React.ChangeEvent<HTMLInputElement>) => {

        setThumbnail(null)
        let selected = e.target.files[0]
       // console.log("selected1", selected)
      
        if (!selected) {
          setThumbnailError('Please select a file')
          alert('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setThumbnailError('Selected file must be an image')
          alert('Selected file must be an image')
          return
        }
        if (selected.size > 100000) {
          setThumbnailError('Image file size must be less than 100kb')
          alert('Image file size must be less than 100kb. e.g. 170px : 170px res. 70 px/in')
          return
        }
        //console.log("selected2", selected)  
        setThumbnailError(null)
        setThumbnail(selected)
        //console.log("thumbnailFin", thumbnail)
        //console.log('thumbnail updated')
        //console.log('thumbnailError', thumbnailError)
      }
      //console.log("thumbnail2", thumbnail)


      const uploadFile = async () => { 

        if(currentUser && thumbnail){
        const uploadPath = `thumbnails/${currentUser.uid}/${thumbnail.name}`
        if (thumbnail === null) {
          console.log("Please select an image");
          return;
        }    
        const imageRef = storageRef(storage, uploadPath);
  
        await uploadBytes(imageRef, thumbnail)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                setPictureURL(url);
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });

        }
      };

     // console.log('PictureURL',pictureURL ); 

useEffect(()=>{
  uploadFile()

},[thumbnail])


const updatingProfile = async()=>{
  if(currentUser){

   await updateProfile(currentUser, {
      photoURL: pictureURL 
  })
  .then(() => {
  //console.log("response",response);
  console.log("Profile updated!");
  })
  .catch((error) => {
  console.log(error);
  });
   }
  }
const updateAvatarBase =async ()=>{
  if(currentUser){  
    const userRef = doc(db, "usersData",currentUser?.uid);
    await updateDoc(userRef, {
      avatar: pictureURL
      })
      .then(()=> {console.log("new avatar set")})
    }
}

useEffect(()=>{

  updatingProfile();
  updateAvatarBase();
//console.log("picture", )
},[uploadFile,pictureURL,updateAvatarBase])
      
//tego jeszcze nie ma
// useEffect(()=>{
//   
//   }
//   updateAvatar2()
//   },[thumbnail,uploadFile])
    
return (
<>

<input
  // label="Image"
  placeholder="Choose image"
  accept="image/png,image/jpeg"
  type="file"
  onChange={(e) => {
    handleFileChange(e)
    //console.log(e.target.files[0])
   setThumbnail(e.target.files[0]);
  }}
/>
{/* <button onClick={uploadFile}>Upload</button> */}
</>)
}

export default SetAvatar;


