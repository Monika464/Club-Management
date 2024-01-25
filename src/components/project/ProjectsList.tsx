import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import './projectList.css'
import { format } from "date-fns";
import pl from "date-fns/locale/pl";


//export interface IProjectListProps {};
export interface IDocument {

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
  toMillis():number;
  seconds: number;
  nanoseconds: number;
}
interface IProjectListProps {
  projects: IDocument[] | null;
}
export interface IComment{
  content: string;
  created_at: IDateObj;
  displayName: string;
  photoURL: string;
  id: string; 
  uid: string;
}

    const ProjectList: React.FunctionComponent<IProjectListProps> =(props) => {

     // const [catDetailAr, setCutDetailsAr] = useState<string[]>("")
     if(props.projects){
        //  props.projects.forEach((el)=>{

        //   //const a1 = 
       console.log(console.log("projects",props.projects))

        //   })

                props.projects.sort((a, b) => {
                  const projectA = a.created_at.toMillis();
                   // console.log(console.log("timestampA",projectA))
                  const projectB = b.created_at.toMillis();
                // console.log(console.log("timestampB",projectB));
          
                return projectB - projectA;
             })

   

     return (
          <div className="project-list">
            {props.projects.length === 0 ? (
              <p>brak wydarzeń</p>
            ) : (


              props.projects.map((project) => (
                // <div className="petla" key={project.id}>
                <div className="itemL" key={project.id}>
                 <ul>
                    <li>
                      <Link to={`/projects/${project.id}`}>
                                           
                            <h4>{project.name}</h4>
                            {/* <p>{`${project.eventdate.toDate().toLocaleDateString('pl-PL')}`}</p> */}
                            <p>{`${format(new Date(project.eventdate?.toMillis()), 'PPP',{locale: pl})}`}</p>
                       </Link> 
                            <div className="details">
                              {/* <p>{project.details}</p>  */}
                              {/* <p>{catDetail}</p> */}
                              <p>{ project.details &&  project.details.slice(0, 180)}</p> 
                              <Link to={`/projects/${project.id}`} style={{ fontSize: 'small' }}>{'czytaj dalej >>>'}</Link>
                          </div>
                          <Link to={`/projects/${project.id}`}>
                          <img src={project.photo} alt="photo" className="photo" />
                     
                      </Link>
                      <div className="assigned-to">
                        <ul>
                          {  project.assignedUsers && project.assignedUsers.map((user) => (
                            <li key={user.id}>
                              <Avatar src={user.avatar} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              ))
            )}
          </div>
        );
      
 }
    }

export default ProjectList