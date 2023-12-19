import { Link } from "react-router-dom"
import AttendanceList from "../components/AttendanceList"

export interface IAttendancepage {

}

const Attendancepage: React.FunctionComponent<IAttendancepage> =(props) => {


    return(
        <div>

            <div> <AttendanceList/></div>

            <div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>
           
      

       </div>


    )
}

export default Attendancepage