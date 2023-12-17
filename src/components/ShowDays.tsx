import { useState } from "react";
import { useFetchDates } from "../hooks/useFetchDates";
import { useFetchMonths } from "../hooks/useFetchMonths";

export interface IShowdaysProps {};


export const ShowDays: React.FunctionComponent<IShowdaysProps> =(props) => {

  const data =  useFetchDates();

  const dataMonths = useFetchMonths()

  const [isShowAllDays, setIsShowAllDays] = useState(false);
const manageShowAllDaysButton =()=>{
  setIsShowAllDays(!isShowAllDays)

}

    
    // chat
    const dateMap: { [key: string]: Date[] } = {};
// Grupowanie dat według miesięcy
data?.forEach((elem) => {
  const monthYearKey = ` ${elem.toDate().getMonth()}-${elem.toDate().getFullYear()}`;
  if (!dateMap[monthYearKey]) {
    dateMap[monthYearKey] = [];
  }
  dateMap[monthYearKey].push(elem);
});

//console.log('dateMap',dateMap)
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
      {isShowAllDays && <div>
<div className="datelist">


{/* Iteruj po grupach dat i wyświetl daty w sekcjach */}
{Object.keys(dateMap).map((monthYearKey) => (
          <div key={monthYearKey}>
            <h5>
              {/* Wyświetl nazwę miesiąca i rok jako nagłówek sekcji */}
              {"|" +" " +new Date(dateMap[monthYearKey][0].toDate()).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })+" "+"|"}
              
             
              
            </h5>
            {dateMap[monthYearKey].map((elem, index) => (
              <p key={index}>
                {`${elem.toDate().getDate()} ${elem.toDate().toLocaleDateString('default', {
                  weekday: 'short',
                })}`}
              </p>
            ))}
          </div>
        ))}
</div>
</div>}


{isShowAllDays ? <button onClick={manageShowAllDaysButton} className="btn">hide all dates </button>  
: <button onClick={manageShowAllDaysButton} className="btn">show all dates </button> 
}
    
    {/* 
    dates form database
    <div className="datelist">
   {data && data.map((elem, index) => <p key ={index}>{`${elem.toDate().getDate()} ${elem.toDate().toLocaleString('default', { month: 'short' })} ${elem.toDate().toLocaleDateString('default', { weekday: 'short' })}`}</p>)}
   </div>
   */}
    {duplicates &&  duplicates.map((dup, index )=><p key={index} style={{color: 'red'}}>Duplikat: {dup.toDate().toString()}</p>)}
    
    </>)
}
