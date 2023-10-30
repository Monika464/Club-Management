import { FormWrapper } from "./FormWrapper";


interface IAccountFormProps {

    email: string,
    setEmail: (value: string) => void;
    password: string,
    setPassword: (value: string) => void;
}


export function AccountForm(props: IAccountFormProps){

    return(<>
    <FormWrapper title="Email and password">
        <label>Email</label>
        <input 
        autoFocus 
        required 
        type="email"
        onChange={(e) => props.setEmail(e.target.value)}
         value={props?.email}   
        ></input>
        <label>Password</label>
        <input 
        required 
        type="password"
        onChange={(e) => props.setPassword(e.target.value)}
        value={props?.password}  
        ></input>
        </FormWrapper>  
        </>)
}