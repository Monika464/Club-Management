import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import './projectList.css'
import { useEffect, useState } from "react";

export interface IProjectListProps {};


    const ProjectList: React.FunctionComponent<IProjectListProps> =(props) => {

     // const [catDetailAr, setCutDetailsAr] = useState<string[]>("")
     if(props.projects){
         props.projects.forEach((el)=>{

          //const a1 = 
          console.log(console.log("projectsEl",el.created_at.toDate().getTime()))
        })

        const projectesMod = props.projects.sort((a, b) => {
          const projectA = a.created_at.toDate().getTime();
         // console.log(console.log("timestampA",projectA))
          const projectB = b.created_at.toDate().getTime();
         // console.log(console.log("timestampB",projectB));
          
          return projectB - projectA;
        })

        //console.log("projectesMod",projectesMod)
        // props.projects.sort((a, b) => {
        //   const timestampA = a.toDate().getTime();
        //   console.log(console.log("timestampA",timestampA))
        //   const timestampB = b.toDate().getTime();
        //   console.log(console.log("timestampB",timestampB))

        //   return timestampA - timestampB;
        // });

      }
        //sortedProjects.sort((a, b) => b.created_at - a.created_at);

        // useEffect(()=>{
        //   const temp =[]
        //   props.projects.forEach((project) => {
        //     console.log('project',project.details.slice(0, 180))
        //     temp.push(project.details.slice(0, 150))
        //     setCutDetailsAr(temp)
        //   })

        // },[props.projects])

       //tutaj zmodyfikowac liste projektow tak jak w datach jest !!!!!!!!!

        

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
                              {/* <p>{catDetail}</p> */}
                              <p>{project.details.slice(0, 180)}</p> 
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