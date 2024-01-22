/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 23:53:08 by cmariot           #+#    #+#             */
/*   Updated: 2024/01/22 18:57:14 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import './App.css';

import { RouterProvider } from "react-router-dom";
import { UserComponent } from "./Contexts/User.context";

import { createBrowserRouter } from "react-router-dom";
import { Home } from './Components/Home/home';
import { Wrapper } from './Components/Wrapper/wrapper';
import { EnterTheAccount } from './Components/EnterTheAccount/enter_the_account';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Wrapper />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/enter_the_account",
                    element: <EnterTheAccount />,
                },
                // {
                //     path: "/personalization",
                //     element: <Personalization />,
                // },
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