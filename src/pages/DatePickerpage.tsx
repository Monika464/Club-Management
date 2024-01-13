
import { DatePickerTrainings } from "../components/DatePickerTrainings"
import { ShowDays } from "../components/ShowDays"

export interface IDatePickerpages {

}

const DatePickerpages: React.FunctionComponent<IDatePickerpages> =(props) => {


    return(
        <div>

            <div> <DatePickerTrainings/></div>


            <div><ShowDays/></div>
           
       

       </div>


    )
}

export default DatePickerpages