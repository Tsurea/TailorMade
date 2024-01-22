/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 23:53:08 by cmariot           #+#    #+#             */
/*   Updated: 2024/01/22 21:06:48 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import './App.css';

import { RouterProvider } from "react-router-dom";
import { UserComponent } from "./Contexts/User.context";

import { createBrowserRouter } from "react-router-dom";
import { Home } from './Components/Home/home';
import { Wrapper } from './Components/Wrapper/wrapper';
import { EnterTheAccount } from './Components/EnterTheAccount/enter_the_account';
import { CustomerAccount } from './Components/CustomerAccount/customer_account';
import { UncompleteCustomerAccount } from './Components/UncumpleteCustomerAccount/uncomplete_customer_account';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />,
        },
        {
            element: <Wrapper />,
            children: [
                {
                    path: "/enter_the_account",
                    element: <EnterTheAccount />,
                },
                {
                    path: "/customer_account",
                    element: <CustomerAccount />,
                },
                {
                    path: "/uncomplete_customer_account",
                    element: <UncompleteCustomerAccount />,
                }
            ]
        }
    ]
)

export function App() {
    return (
        <UserComponent>
            <RouterProvider router={router} />
        </UserComponent>
    );
}