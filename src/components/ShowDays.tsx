import { useFetchDates } from "../hooks/useFetchDates";

export interface IShowdaysProps {};


export const ShowDays: React.FunctionComponent<IShowdaysProps> =(props) => {


    const data =  useFetchDates();

    const duplicates: any[] = [];

    data?.forEach((elem, index) => {
       const timestampA = elem.toDate().getTime();
       
       // Porównaj aktualny element z pozostałymi
       for (let i = index + 1; i < data.length; i++) {
         const timestampB = data[i].toDate().getTime();
     
         if (timestampA === timestampB) {
           // Znaleziono duplikat
           duplicates.push(elem);
           break; // Jeśli znaleziono duplikat, można przerwać pętlę, aby nie szukać dalej
         }
       }
     });
     
    return(
    <>
    show
   {data && data.map((elem, index) => <p key ={index}>{elem.toDate().toString()}</p>)}
    {duplicates &&  duplicates.map((dup, index )=><p key={index} style={{color: 'red'}}>Duplikat: {dup.toDate().toString()}</p>)}
    
    </>)
}
