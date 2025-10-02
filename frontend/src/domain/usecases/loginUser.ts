import { apiLogin } from "@/data/api/services/authService";
import type { AccessToken, LoginCredentials } from "@/core/entities/User";

export const loginUser = async (credentials: LoginCredentials): Promise<AccessToken> => {
    try {
        const token = await apiLogin(credentials);
        localStorage.setItem('accessToken', token);
        return token;
    } catch (error: any) {
        const detail = error.response?.data?.detail || 'Falha na autenticação. Verifica as credenciais';
        throw new Error(detail);
    }
}