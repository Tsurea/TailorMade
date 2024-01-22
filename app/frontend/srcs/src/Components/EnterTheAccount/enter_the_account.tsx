import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./enter_the_account.css";

export function EnterTheAccount() {

    const navigation = useNavigate();

    const [first_name, setFirstName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [postal_code, setPostalCode] = useState<string>("")

    // Function that handles the change of the first name input
    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setFirstName(event.target.value);
    }

    // Function that handles the change of the name input
    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setName(event.target.value);
    }

    // Function that handles the change of the email input
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setEmail(event.target.value);
    }

    // Function that handles the change of the postal code input
    function handlePostalCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPostalCode(event.target.value);
    }

    // Function that handles the click on the search button
    function handleClick() {

        console.log("First Name: " + first_name)
        console.log("Name: " + name)
        console.log("E-mail: " + email)
        console.log("Postal Code: " + postal_code)

        // TODO : Post the data to the API

        // Navigate to the next page
        navigation("/customer_account");
    }

    return (
        <div id="enter_the_account_div">
            <main id="enter_the_account_main">
                <h1 id="enter_the_account_h1">ENTER THE ACCOUNT</h1>
                <div id="enter_the_account_qr_code">
                    <img id='enter_the_account_qr_code_logo' src="../../../assets/qr_code.png" alt="QR Code logo" />
                    <a href="">QR Code</a>
                </div>
                <form id="enter_the_account_form">
                    <input type="text" className="input_field" placeholder="First Name" onChange={handleFirstNameChange} />
                    <input type="text" className="input_field" placeholder="Name" onChange={handleNameChange}/>
                    <input type="text" className="input_field" placeholder="E-mail" onChange={handleEmailChange} />
                    <input type="text" className="input_field" placeholder="Postal Code" onChange={handlePostalCodeChange} />
                    <input type="submit" className="submit_button" value="SEARCH" onClick={handleClick} />
                </form>
            </main>
            <footer id="enter_the_account_footer">
                <h1>YOU DON’T HAVE AN ACCOUNT?</h1>
                <button>CREATE AN ACCOUNT</button>
            </footer>
        </div>
    )
}
