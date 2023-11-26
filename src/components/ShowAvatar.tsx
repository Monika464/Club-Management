







// export interface IShowAvatar{}
// import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../context/UserContext';
// import { updateProfile } from "firebase/auth";
// import { getDownloadURL, ref } from 'firebase/storage';
// import { storage } from '../App';


// const ShowAvatar = (props: IShowAvatar) => {
//     const {currentUser} = useContext(UserContext); 
    
//     const [picURL, setPicURL] = useState<string | null >(null)

//     useEffect(()=>{

//       console.log("tu obraz", currentUser?.photoURL)
//         if(currentUser){
//             setPicURL(currentUser.photoURL);
           
//            console.log("to usurphto",currentUser.photoURL )
//            console.log("to jest fotourl",picURL )
//         }

//     },[currentUser])

//   // Create a reference to the file we want to download

// const starsRef = ref(storage, `thumbnails/${currentUser?.uid}/elfka.png}`);

// // Get the download URL
// getDownloadURL(starsRef)
//   .then((url) => {
//     // Insert url into an <img> tag to "download"
//   console.log("url", url)
//   })
//   .catch((error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/object-not-found':
//         // File doesn't exist
//         break;
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect the server response
//         break;
//     }
//   });
    
// return(<>
// show awatar
// <br></br>
// <img src={currentUser?.photoURL} alt="Image" />;
// </>)
// }
// export default ShowAvatar;
