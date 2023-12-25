import { useEffect } from 'react';
import useFetchCollectionData from '../hooks/useFetchCollections.tsx';
import ProjectList from '../components/ProjectsList.tsx';
import useFetchRealTimeCall from '../hooks/useFetchRealTimeColl.tsx';
import Project from './Project.tsx';
import ProjectSingle from '../components/ProjectSingle.tsx';
import { Link, NavLink } from 'react-router-dom';
import AddIcon from '../assets/add_icon.svg';

export interface HomeProps {};
//console.log("auth",auth)

    const HomePage: React.FunctionComponent<HomeProps> =(props) => {

        const {dataFromCollection, error} = useFetchCollectionData("projects")
        const {dataFromCollection: userData, error: userError} = useFetchCollectionData("usersData")
       
        useEffect(()=>{
    
   //console.log("dataFromCollection",dataFromCollection)
    },[dataFromCollection])
    
  

    return (
        <>
            <h2 className='page-title'>Dashboard</h2>
       {error && <p className='error'>{error}</p>}
       {dataFromCollection && <ProjectList projects={dataFromCollection}/>}

  <ProjectSingle/>

 

             {/* <p key={doc.uid}>
                 {doc.name}
                {doc.details}
               {(doc.eventdate).toDate().toString()} */}
                <br></br>
             
{/*
    {`${doc.eventdate.toDate().toLocaleDateString('pl-PL')}`}
    <br></br>
                <img src={doc.photo} style= {{width: 80 }} alt="photo" />

                 {doc.assignedUsers && doc.assignedUsers.map((user)=>(
                   <p key={user.id}>
                   <img src= {user.avatar} style= {{width: 20 }} alt="avatar" />
                   </p>                
                   </p>
                   ))} 
        */}


        </>
    );

}

{/* <div className="siteLink"> 
<ul>
  <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
</ul>
</div> */}

export default HomePage;