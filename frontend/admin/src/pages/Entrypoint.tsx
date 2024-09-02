import {Navigate, Outlet} from "react-router-dom";

export default function Entrypoint(){
    
    const reservation_admin: any | null = localStorage.getItem("reservation_admin");
    

    return(
       reservation_admin? 
       
       <div className="app">
            <main className="content">
            <Outlet/>
            </main>

        </div>: <Navigate to={"/login"}/>
    );
}