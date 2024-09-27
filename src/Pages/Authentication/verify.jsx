import axios from "axios"
import { useLocation } from "react-router-dom";

const verified = async (token) => {
    // console.log(token);
    return await axios.get(`https://test-backend-pink.vercel.app/api/verify?token=${token}`)
}

const verify = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    verified(token).then(res => {
        console.log(res)
    })


    return (<>verif</>)
}

export default verify