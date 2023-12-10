import { useParams } from "react-router-dom"
import useFetchCollectionData from "../hooks/useFetchCollections"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../App";
import { useEffect, useState } from "react";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

export interface IProjectProps {};
export interface IDocument {

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

    } | null
};


    const ProjectSingle: React.FunctionComponent<IProjectProps> =(props) => {

        const [document, setDocument] = useState<IDocument | null>(null)
const [error, setError] = useState<string | null>(null)

        
        //const id = "fUV7CMUHmhNPQ9ELAOKz";
        const {id} = useParams()
        
        useEffect(()=>{
          
            //const projectRef = doc(db, "projects", "t3uDsH8i1IuNsvieBwXK");
          
            try {
                const projectRef = doc(db, "projects", id); 
                const unsub = onSnapshot(projectRef, (doc) => {

                   if(doc.data()){
                      console.log("Current data: ", doc.data().id);
                      setDocument({...doc.data(),id: doc.id})
                      // setDocument({...doc.data(),id: doc.id});
                       
                    } else {
                        setError("no such document exists")
                    }
                });
               
                return () => unsub();


                
            } catch (error) {
                setError(error)
               
            }

            if(error){
                //return <div className="error">{error}</div>
            }

            if(!document){
                //return <div className="loading">loading ...</div>
            }
          
           
            
console.log("to error", error)
           

        },[id,db])
      
    
        //console.log("to tu w document", document)

        return(<>
        <div className="project-details">
        <ProjectSummary project={document} />
        <ProjectComments project={document}/>
           
            {/* <h1>{document?.name}</h1> */}

{/* {error && <p>{error.toString}</p>} */}

        </div>
        </>)
    }

    export default  ProjectSingle