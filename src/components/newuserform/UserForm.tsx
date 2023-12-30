import React from "react";
import { FormWrapper } from "./FormWrapper"
interface IUserFormProps {
    setName: (value: string) => void;
    setSurname: (value: string) => void;
    name: string;
    surname: string;
    setDob: (value: Date) => void;
    dob: Date;
  }
  


export function UserForm(props: IUserFormProps){

    const [dobInput, setDobInput] = React.useState(
        props.dob?.toISOString().split("T")[0]
      );

      const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDobInput(e.target.value);
        const dateParts = e.target.value.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
        const day = parseInt(dateParts[2]);
        const newDate = new Date(year, month, day);
        props.setDob(newDate);
      };

    return(<>
    <FormWrapper title="User Detials">
    <label>First Name</label>
    <input 
    autoFocus 
    required 
    type="text"
    onChange={(e) => props.setName(e.target.value)}
    value={props?.name}
    ></input>
    <label>Second Name</label>
    <input 
    required 
    type="text"
    onChange={(e) => props.setSurname(e.target.value)}
    value={props?.surname}
    ></input>
    <label>date of birth</label>
    <input 
    required 
    type="date"
    onChange={handleDobChange}
    defaultValue={props.dob}
    /*value={props?.dob}*/
    
    ></input>
   
    </FormWrapper>
    </>)
}