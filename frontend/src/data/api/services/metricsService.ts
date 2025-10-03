import axios from 'axios';
import type { Metric } from '@/core/entities/User';

const API_BASE_URL = 'http://localhost:8000';

export interface MetricsQueryParams {
    skip: number;
    limit: number;
    order_by?: string;
    start_date?: string;
    end_date?: string;
}


export const apiFetchMetrics = async (params: MetricsQueryParams): Promise<Metric[]> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error("Token de autenticação não encontrado ou expirado!");
    }

    try {
        const response = await axios.get<Metric[]>( 
            `${API_BASE_URL}/metrics/`,
            {
                params: params, 
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );
        
        return response.data;
    } catch (error) {
        throw error;
    }
};