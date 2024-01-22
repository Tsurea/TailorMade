import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/navigation";

export function Wrapper() {

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}
