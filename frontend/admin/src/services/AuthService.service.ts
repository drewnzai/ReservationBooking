import axios from "axios";
import {LoginRequest} from "../models/LoginRequest";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const base_url = "http://localhost:8080/api/auth/";

export default class AuthService{

    private navigate = useNavigate();

    login(loginRequest: LoginRequest){
        axios.post(base_url + "login", loginRequest)
        .then(
            (response) => {
                
                if(response.data.data){
                    toast.error(response.data.data);
                    return;
                }
                else{
                    localStorage.setItem("reservation_admin", JSON.stringify(response.data));
                    this.navigate("/");
                }
            }
        )
    }

    logout(){
        localStorage.removeItem("reservation_admin");
        this.navigate("/login");
    }
}