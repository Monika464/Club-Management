import Avatar from './Avatar';
import './project.css'

export interface IProjectSummaryProps {
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


    const ProjectSummary: React.FunctionComponent<IProjectSummaryProps> =(props) => {

        console.log("props.project",props?.project?.name)
        return(<div>
{props.project && 
    <div className="project-summary"> 

<h1 className="page-title">{props?.project?.name}</h1>

<p className='due-date'>{`${props?.project?.eventdate.toDate().toLocaleDateString('pl-PL')}`}</p>
<p>{props?.project?.details}</p>

<img src={props?.project?.photo} className='photo' />
<h4>projekt realizujemy z</h4>
<div className="assigned-to">
        <ul>
          {props?.project?.assignedUsers?.map(user =>(
           <li key={user.id}>
           <Avatar src={user.avatar}/> 
           <p>{user.name}</p>   
           </li>
          ))}
          </ul>
     </div>

</div>     


}
     
        
        </div>)

    }

    export default ProjectSummary