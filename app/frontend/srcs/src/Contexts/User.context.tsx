/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.context.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 14:03:18 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 23:24:50 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { AuthService } from "../Services/Auth.service";

export interface User {
    isLogged: boolean;
    username: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType>({
    user: {
        isLogged: false,
        username: "",
        email: "",
        role: "user",
    },
    setUser: (user: SetStateAction<User>) => {
        console.warn(
            "You are using default context provider for UserContext, please add your own implementation.", user
        );
    },
});

export function UserComponent({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User>({
        isLogged: false,
        username: "",
        email: "",
        role: "user",
    });

    useEffect(() => {
        if (user.isLogged === false) {

            const accessToken = localStorage.getItem("access_token");
            axios.defaults.headers.common['Authorization'] = AuthService.getAuthHeader();

            if (accessToken) {

                // Load the user info
                axios.get('/api/users')
                    .then(function (response: AxiosResponse<{ username: string, email: string, role: string }>) {
                        setUser({
                            isLogged: true,
                            username: response.data.username,
                            email: response.data.email,
                            role: response.data.role,
                        })
                    })
                    .catch(function () {

                        // If the access token is invalid, try to refresh it
                        const refresh_token = localStorage.getItem("refresh_token");

                        if (refresh_token) {
                            axios.post(
                                '/api/auth/refresh',
                                { refresh_token: refresh_token }
                            )
                                .then(function (response: AxiosResponse<{ access_token: string, refresh_token: string }>) {
                                    // If the refresh token is valid, update the access token and the refresh token
                                    localStorage.setItem(
                                        "access_token",
                                        JSON.stringify(response.data.access_token)
                                    );
                                    localStorage.setItem(
                                        "refresh_token",
                                        JSON.stringify(response.data.refresh_token)
                                    );
                                    // useEffect will be called again and the user info will be loaded
                                    setUser({
                                        isLogged: false,
                                        username: "updated",
                                        email: "",
                                        role: "user",
                                    })

                                })
                                .catch(function () {
                                    localStorage.removeItem("access_token");
                                    localStorage.removeItem("refresh_token");
                                })
                        }
                    })
            }
        }
    }, [user]);

    // Return the user context provider and the user context consumer
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}