import { add } from "date-fns"
import { useSearchIndexCloseToday  } from "../hooks/useSearchIndexCloseToday"
import { useEffect } from "react"

export const TestingFnsLib: React.FunctionComponent = ()=>{
  const  tod =  useSearchIndexCloseToday()
  //useEffect(()=>{
 

    console.log("todaysIndexuu",tod)

  //},[tod])



    const result = add(new Date(2014, 8, 1, 10, 19, 50), {
        years: 2,
        months: 9,
        weeks: 1,
        days: 7,
        hours: 5,
        minutes: 9,
        seconds: 30,
      })


      const result2 = add(new Date(), {
  
        days: 1,
 
      })

     // console.log("res", result2)

    return (<>
    
    fns test
    
    </>)
}