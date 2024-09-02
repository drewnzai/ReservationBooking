import {Navigate, Outlet} from "react-router-dom";

export default function Entrypoint(){
    
    const reservation_user: any | null = localStorage.getItem("reservation_admin");
    

    return(
       reservation_user? 
       
       <div className="app">
            <main className="content">
            <Outlet/>
            </main>

        </div>: <Navigate to={"/login"}/>
    );
}