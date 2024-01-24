import { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext';
import { Timestamp, doc,  updateDoc} from "firebase/firestore";
import { db } from "../../App";
import Avatar from "../Avatar";

export interface IProjectComments {
    project: {
        assignedUsers: string[] | null
        category: string 
           comments: string[] | null
           created_at: Date
           details: string | null
           eventdate: Date
           name: string
           photo: URL
           visibility: string
           id: string
    } | null;
}
// Date zamien na obj


  const ProjectComments: React.FunctionComponent<IProjectComments> =(props) => {
    
    const { currentUser} = useContext(UserContext);
    const [newComment, setNewComment] = useState('')

    console.log('props',props)

const handleSubmit =async(e: { preventDefault: () => void; })=>{
    e.preventDefault()

     const commentToAdd = {
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
        content: newComment,
        created_at: Timestamp.fromDate(new Date),
        id: Math.random()
       }

  
    console.log("proooops",props?.project?.comments[0])

    if(props.project){
           const updateComment = async(id: string)=>{

//if(props.project.comments){
           const userRef = doc(db, "projects",id);
                await updateDoc(userRef, {
          comments: [...props.project.comments, commentToAdd]
         })
        .then(()=>{console.log("komentarz zapisany")})
         }
//}

  updateComment(props.project.id)
   }
}

//console.log("props.project",props.project)


return(
<div>

<div className="comments-container">
    <div className="project-comments">
      
    {props.project?.comments  && <h4>Komentarze</h4>}
     <ul>
    {props.project?.comments &&  props.project?.comments?.length>0 && props.project.comments.map((com)=>(
      <li key={com.id}>

        <div className="comment-author">
          <Avatar src={com.photoURL}/>

            <p>{com.displayName}</p>
            </div>
          
             <p className="comment-date">{`${com.created_at?.toDate().toLocaleDateString('pl-PL',{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
             })}`}</p>
 
        <div className="comment-content">
        <p>{com.content}</p>
        </div>
        <br></br>
      

      </li>
   
     ))}
</ul>

   </div>


{props.project && <div>
  <div className="add-comment-container">
{/* <h4>Project comments</h4> */}
<form className="add-comment" onSubmit={handleSubmit}>
  <label>
<span>Skomentuj</span>
<textarea
required
onChange={(e)=>setNewComment(e.target.value)}
value={newComment}
></textarea>
  </label>
  <button className="btn">Send</button>

</form> 
</div>
</div>}
</div>
</div>)
}

export default ProjectComments;