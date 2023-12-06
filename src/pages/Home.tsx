import { useEffect } from 'react';
import useFetchCollectionData from '../hooks/useFetchCollections.tsx';

export interface HomeProps {};
//console.log("auth",auth)

    const HomePage: React.FunctionComponent<HomeProps> =(props) => {

        const {dataFromCollection, error} = useFetchCollectionData("projects")

        useEffect(()=>{
    
    console.log("dataFromCollection",dataFromCollection)

},[dataFromCollection])
      


    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
       {error && <p className='error'>{error}</p>}
       {dataFromCollection && dataFromCollection.map((doc)=>(
             <p key={doc.uid}>
                {doc.name}
               {doc.details}
               {/* {(doc.eventdate).toDate().toString()} */}
               <br></br>
               {`${doc.eventdate.toDate().getDate()} ${doc.eventdate.toDate().toLocaleDateString('default', {
    weekday: 'short',
    })}`}
               <img src={doc.photo} style= {{width: 80 }} alt="photo" />

                {doc.assignedUsers && doc.assignedUsers.map((user)=>(
                  <p key={user.id}>
                  <img src= {user.avatar} style= {{width: 20 }} alt="avatar" />
                  </p>
                ))}

            </p>
       ))}
        </div>
    );
}


export default HomePage;