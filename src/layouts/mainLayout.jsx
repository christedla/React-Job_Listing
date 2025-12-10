import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";

const MainLayout = () => {
    return (
        <>
            <NavBar />
            < Outlet />
           
        </>
    );
}
export default MainLayout;