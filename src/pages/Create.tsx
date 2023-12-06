
export interface ICreate {};
export interface US {
    value: string | null
    label: string | null
  }

import Select from 'react-select'
import './create.css'
import { useEffect, useState } from 'react';
import { useModUsersForSelect } from '../hooks/useModUsersForSelect ';
import { addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../App';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useModAvatUsers } from '../hooks/useModAvatUsers';
import { useNavigate } from 'react-router-dom';
import { uploadBytes,ref as storageRef, getDownloadURL } from 'firebase/storage';
//import { Timestamp } from 'firebase-admin/firestore';

    const Create: React.FunctionComponent< ICreate> =(props) => {


        const [name, setName] = useState('')
      const [details, setDetails] = useState('')
      const [eventDate, setEventDate] = useState('')
      const [category, setCategory] = useState<string | null>('')
      const [assignedUsers, setAssignedUsers] = useState<string[] | null>([])
      const [formError, setFormError] = useState<string | null>(null)
      const [visibility, setVisibility] = useState<string | null>('')
      const [newUsersList, setNewUsersList] = useState<US[]>([])
      const [eventDateTime, setEventDateTime] = useState<string>(''); // Przechowuje datę i godzinę jako string
      const [thumbnail, setThumbnail] = useState<File | null | string | any>(null)
      const [thumbnailError, setThumbnailError] = useState<string | null>(null)
      const [pictureURL, setPictureURL] = useState<URL | null | string>(null)
 
      const userModForSelect  =  useModUsersForSelect(); 
      const usersWithAvatars = useModAvatUsers()
      const navigate = useNavigate();

      const categories  = [
        {value: 'zawody', label: 'Zawody'},
        {value: 'treningi', label: 'Treningi'}, 
        {value: 'inne', label: 'Inne'}
      ];

      const visible = [
        {value: 'public', label: 'Publiczne'},
        {value: 'privat', label: 'Prywatne'}
      ];

 //console.log('assignedUsers', assignedUsers)


    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEventDateTime(e.target.value);
      };



      const handleFileChange =  (e: React.ChangeEvent<HTMLInputElement>) => {


        setThumbnail(null)
        let selected = e.target.files[0]
        console.log("e.target", e.target)
        console.log("selected1", selected)
      
        if (!selected) {
          setThumbnailError('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setThumbnailError('Selected file must be an image')
          return
        }
        if (selected.size > 10000000) {
          setThumbnailError('Image file size must be less than ..kb')
          return
        }
        console.log("selected2", selected)  
        setThumbnailError(null)
        setThumbnail(selected)
        console.log("thumbnailFin", thumbnail)
        //console.log('thumbnail updated')
        console.log('thumbnailError', thumbnailError)
      }
      console.log("thumbnail2", thumbnail)



      

      console.log('PictureURLzeew',pictureURL ); 


    const handleSubmit = async (e) => {
        e.preventDefault()
          setFormError(null)

      
        const uploadPath = `projects-photo/${thumbnail.name}`;
         const imageRef = storageRef(storage, uploadPath);
  
     
          const snapshot = await uploadBytes(imageRef, thumbnail);
          const url = await getDownloadURL(snapshot.ref);
       
          console.log("urlLLL", url);
     

        console.log('PictureURLnadole',pictureURL );
  

    const assignedUsersList = assignedUsers?.map((u)=>{

       return {
      name: u.value.name,
      surname: u.value.surname,
      avatar: u.value.avatar,
      id: u.value.id
    }
    })



          const moddate = new Date(eventDate)
          console.log("modddate",moddate )
        const docRef = await addDoc(collection(db, "projects"), {
         name: name,
      details: details,
      category: category.value,
      eventdate: moddate,
      visibility: visibility.value,
      assignedUsers: assignedUsersList,
      created_at: serverTimestamp(),
       photo: url,
      comments: [] 
        })
       .then(()=>{                       
          console.log("susceess!! Data sent")
      // resetState();
        })
        .then(()=>{                   
         navigate("/home");
       // resetState();
         })
        .catch((err)=>{console.error(err)}) 
    
  
   
        console.log(name, details,'eventDate', eventDate, category.value, assignedUsersList,visibility.value)
   

      console.log("formError",formError)


}

   




    return (

        <div className='create-form'>
             <h2 className='page-title'>Create a new project</h2>
    


             <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            // required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
          required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set time of event :</span>
          {/* <input
          required
          type="datetime-local"
          onChange={handleDateTimeChange}
          value={eventDateTime}
            /> */}
          <input
          required 
            type="date" 
            onChange={(e) => setEventDate(e.target.value)} 
            value={eventDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
        required 
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Visibility:</span>
          <Select
          //required 
            onChange={(option) => setVisibility(option)}
            options={visible}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => 
              
               setAssignedUsers(option)
            
            }

            //options={newUsersList}
            options={usersWithAvatars}
            isMulti
          />
       </label>

        <label>
              <input
                  // label="Image"
                  placeholder="Choose image"
                  accept="image/png,image/jpeg"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e)
              //console.log(e.target.files[0])
            // setThumbnail(e.target.files[0]);
                   }}
                />
                {/* <button onClick={uploadFile}>Upload</button> */}
                </label>

        <button className="btn">Add Project</button>
      
        
      </form>
      {formError && <p className="error">{formError}</p>}
        </div>
    );
}


export default Create;


