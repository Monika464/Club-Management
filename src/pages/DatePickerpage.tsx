import { Link } from "react-router-dom"
import { DatePickerTrainings } from "../components/DatePickerTrainings"
import { ShowDays } from "../components/ShowDays"

export interface IDatePickerpages {

}

const DatePickerpages: React.FunctionComponent<IDatePickerpages> =(props) => {


    return(
        <div>

            <div> <DatePickerTrainings/></div>


            <div><ShowDays/></div>
           
            <div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>   

       </div>


    )
}

export default DatePickerpages