import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
//import ProjectComments from './ProjectComments';
import './project.css'
import { format } from 'date-fns';
import pl from 'date-fns/locale/pl';
export interface IDocument {
    toMillis(): string | number | Date;
    assignedUsers: IAssignedUser[] | null;
    category: string ;
   comments: IComment[] | null;
    created_at: IDateObj;
    details: string | null;
    eventdate: IDateObj;
    name: string;
    photo: string;
    visibility: string;
    id: string;

}

export interface IAssignedUser{
name: string;
id: string;
avatar: string
}
export interface IDateObj{
    seconds: number;
    nanoseconds: number;
    toMillis(): string | number | Date;
    }

    export interface IComment{
        content: string;
        created_at: IDateObj;
        displayName: string;
        photoURL: string;
        id: string; 
    }
interface ProjectSummaryProps {
        project: IDocument | null;
 }
    const ProjectSummary: React.FunctionComponent<ProjectSummaryProps> =(props) => {

       // console.log("props.project",props?.project?.name)
        
        
        return(<div>
{props.project && 
    <div className="project-summary"> 

            <h1 className="page-title">{props?.project?.name}</h1>

           
            {/* <p className='due-date'>{`${props?.project?.eventdate.toDate().toLocaleDateString('pl-PL')}`}</p> */}
            <p className='due-date'>{props.project && <>{format(new Date(props.project?.eventdate.toMillis()), 'PP-EEEE', {locale: pl})}</>}</p>
            <p className='details'>{props?.project?.details}</p>

            <img src={props?.project?.photo} className='photo' />

        <h4>projekt realizujemy z</h4>
       
       
        <div className="assigned-users">
        <ul>
          {props?.project?.assignedUsers?.map(user =>(
           <li key={user.id}>
          <div className='wyrownaj'>
           <Avatar src={user.avatar} /> 
           <p>{user.name}</p>  
           </div>
           </li>
          ))}
           
          </ul>
          </div>
          <p className='linkback'><Link to="/home">powrót</Link></p>

</div>     


}
  
        
        </div>)

    }

    export default ProjectSummary