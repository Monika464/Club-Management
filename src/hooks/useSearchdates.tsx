import { useFetchDates } from "./useFetchDates";

export const useSearchDates = (): Date[] | null | number => {

    const data =  useFetchDates();

    console.log("data z nowy searchhook",data)
    
    const a = 1;

    return data
}