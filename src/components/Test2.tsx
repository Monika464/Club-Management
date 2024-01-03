
import DateFnsFormat from './DateFnsFormat';
import './test2.css'
export const Test2: React.FunctionComponent =() => {

const tablicapetli =["a","b","c","d","e"];



return ( 
  <>
<div>format dat 

</div>


<div className="containertutu">
      {tablicapetli.map((el, index) => (
        <div key={index} className="item">
          <ul className="raz">
            <li>{el}</li>
          </ul>
        </div>
      ))}
    </div>
    
    </>)
}