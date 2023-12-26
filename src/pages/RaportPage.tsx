import Raportpayments from "../components/Raportpayments"

export interface IRaportPage {

}

const RaportPage : React.FunctionComponent<IRaportPage > =(props) => {

    //select z misiacami wartosc 0 - 11
    // wczytujesz wszytskie payment a w created at
    //w petli wszystkich robisz warunek ze to
    //getmont jest taki sam jak value 
    
    //wyswietlam je i zliczam wartosci
    //potem sie dorobi wysweitlanie dla uzytkownika

    return(<div>
        <Raportpayments/>
    </div>)

}

export default RaportPage 