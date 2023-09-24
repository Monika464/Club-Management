
import { useTest2 } from "../hooks/useTest2";

export const Test2: React.FunctionComponent =() => {

    const temp = useTest2();

return (<div>
    
    { temp && temp.map((el,inde)=> <p>{el.label}</p>)}
    
    
    </div>)
}