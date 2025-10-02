import axios from 'axios';
import type { AccessToken, LoginCredentials } from '@/core/entities/User';

const API_BASE_URL = "http://localhost:8000";

export const apiLogin = async (credentials: LoginCredentials): Promise<AccessToken> => {
    const { username, password } = credentials;

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await axios.post<{ 'access token': AccessToken }>(
            `${API_BASE_URL}/users/login`,
            formData.toString(),
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.data['access token'];
    } catch (error) {
        throw error;
    }

}