import { useFetchDates } from "../hooks/useFetchDates";
import { lastDayOfMonth } from "date-fns";

export const Test2: React.FunctionComponent =() => {

  const data =  useFetchDates();
  if(data){
    const result =  lastDayOfMonth(new Date(data[3].toDate()))
    console.log('result', result)
  }
  //const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 //where gdzie dta wieksza lub rowna od first day i mniejsza lub rowna od last day

return (<div>

test2
    </div>)
}