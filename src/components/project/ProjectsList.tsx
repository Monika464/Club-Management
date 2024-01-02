import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import './projectList.css'
import { useEffect, useState } from "react";

export interface IProjectListProps {};


    const ProjectList: React.FunctionComponent<IProjectListProps> =(props) => {

      const [catDetail, setCutDetails] = useState<string>("")

        console.log("projects", props.projects)

        useEffect(()=>{
          props.projects.forEach((project) => {
            console.log('project',project.details.slice(0, 180))
            setCutDetails(project.details.slice(0, 150))
          })

        },[props.projects])

       

        

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
                            <p>{`${project.eventdate.toDate().toLocaleDateString('pl-PL')}`}</p>
                       </Link> 
                            <div className="details">
                              {/* <p>{project.details}</p>  */}
                              <p>{catDetail}</p>
                              <Link to={`/projects/${project.id}`} style={{ fontSize: 'small' }}>{'czytaj dalej >>>'}</Link>
                          </div>
                          <Link to={`/projects/${project.id}`}>
                          <img src={project.photo} alt="photo" className="photo" />
                     
                      </Link>
                      <div className="assigned-to">
                        <ul>
                          {project.assignedUsers.map((user) => (
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
      


// return (
//             <div className="project-list">

//       {props.projects.length === 0 ? <p>brak wydarzeń</p> : 

//       props.projects.map(project =>(

    
//         <div className="petla"  key={project.id}>
//              <ul>
//              <li> 
//              <Link to={`/projects/${project.id}`}>
//                 <h4>{project.name}</h4>   
//                  <p>{`${project.eventdate.toDate().toLocaleDateString('pl-PL')}`}</p>
//                  <br></br>
                 
//                  {/* <img src={project.photo} style= {{width: 80 }} alt="photo" className="photo"/> */}
//                  <img src={project.photo} alt="photo" className="photo"/>
//               </Link>
//               <div className="details">
//                 <p>{project.details}</p>
//               </div>

//               <div className="assigned-to">
//                  <ul>
//                    {project.assignedUsers.map(user =>(
//                     <li key={user.id}>
//                     <Avatar src={user.avatar}/>    
//                     </li>
//                    ))}
//                    </ul>
//               </div>
//              </li>
//             </ul>

//      </div>

//     // <div key={project.uid}>
//     // {project.name}
//     // {`${project.eventdate.toDate().toLocaleDateString('pl-PL')}`}
//     // <img src={project.photo} style= {{width: 80 }} alt="photo" />
//     // {project.details}  
//     // </div>

// ))
// }



//             </div>
//             )

        }


export default ProjectList;