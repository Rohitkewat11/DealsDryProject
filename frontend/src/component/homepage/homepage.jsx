import { Outlet } from "react-router-dom";


export function Homepage(){
    return(
        <>
            <header className="bg-dark bg-gradient">
                <div className="ms-5">
                    <img src="./dealsDryLogo.png" alt="" width={100} />
                </div>
            </header>
            <Outlet/>
        </>
    )
}