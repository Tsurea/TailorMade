import { useNavigate } from "react-router-dom";
import "./home.css"
import { useEffect } from "react";

export function Home() {

    const navigation = useNavigate();

    // UseEffect redirects to the enter_the_account page after 1.5 seconds
    useEffect(() => {
        setTimeout(() => {
            navigation("/enter_the_account");
        }, 1500)
    })

    return (
        <main id="home_main">
            <img id="home_img" src="../../../assets/logo_tailormade.png" alt="Home" />
        </main>
    )
}
