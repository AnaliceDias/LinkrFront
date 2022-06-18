import Header from "./header/Header";
import { useParams } from "react-router-dom";
import API from "../repository/API";

export default function User(){
    const {id} = useParams();
    console.log(id)

    const promise = API.getPostUser(id)

    promise.then(response => {
        console.log(response.data)
    })

    return (
        <>
            <Header/>
            <>bler</>
        </>
    )
}