import { format,} from "date-fns";
import { pl } from "date-fns/locale";

export interface IDateFnsFormatProps{
element: Date;
}




const DateFnsFormat : React.FunctionComponent<IDateFnsFormatProps> =(props) => {

    //console.log("elem z propsow",format(props.element.toDate(), 'PPP', {locale: pl}))
   
    return(<>
    {props.element && <>{format(props.element.toDate(), 'PPP', {locale: pl})}</>}
    </>)

}

export default DateFnsFormat;  