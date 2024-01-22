export class AuthService {

    // Function that returns the access token from the local storage
    static getAccessToken(): string | null {
        const access_token: string | null = localStorage.getItem("access_token");
        if (access_token) {
            return JSON.parse(access_token) as string;
        }
        return null;
    }

    // Function that returns the refresh token from the local storage
    static getRefreshToken(): string | null {
        const refresh_token: string | null = localStorage.getItem("refresh_token");
        if (refresh_token) {
            return JSON.parse(refresh_token) as string;
        }
        return null;
    }

    // Function that returns the Authorization header
    static getAuthHeader() {
        const access_token = AuthService.getAccessToken();
        if (access_token) {
            return 'Bearer ' + access_token;
        }
        else {
            return '';
        }
    }

}