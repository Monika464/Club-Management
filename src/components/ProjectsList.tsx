import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import './projectList.css'

export interface IProjectListProps {};


    const ProjectList: React.FunctionComponent<IProjectListProps> =(props) => {

        console.log("projects", props.projects)


return (
            <div className="project-list">

      {props.projects.length === 0 ? <p>brak wydarzeń</p> : 

      props.projects.map(project =>(

    
        <div className="petla"  key={project.id}>
             <ul>
             <li> 
             <Link to={`/projects/${project.id}`}>
                <h4>{project.name}</h4>   
                 <p>{`${project.eventdate.toDate().toLocaleDateString('pl-PL')}`}</p>
                 <br></br>
                 <img src={project.photo} style= {{width: 80 }} alt="photo" className="photo"/>
              </Link>

              <div className="assigned-to">
                 <ul>
                   {project.assignedUsers.map(user =>(
                    <li key={user.id}>
                    <Avatar src={user.avatar}/>    
                    </li>
                   ))}
                   </ul>
              </div>
             </li>
            </ul>

     </div>

    // <div key={project.uid}>
    // {project.name}
    // {`${project.eventdate.toDate().toLocaleDateString('pl-PL')}`}
    // <img src={project.photo} style= {{width: 80 }} alt="photo" />
    // {project.details}  
    // </div>

))
}



            </div>
            )

        }


export default ProjectList;