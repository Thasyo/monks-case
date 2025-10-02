import { apiFetchMetrics } from '../../data/api/services/metricsService';
import type { Metric } from '@/core/entities/User';
import type { MetricsQueryParams } from '../../data/api/services/metricsService';

export const getMetrics = async (params: MetricsQueryParams): Promise<Metric[]> => {
    try {
        const metrics = await apiFetchMetrics(params); 
        return metrics;
    } catch (error: any) {
        // Lógica de domínio para erros (ex: se for 401, limpar o token do localStorage)
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            throw new Error("Sessão expirada. Faça o login novamente.");
        }
        throw new Error(error.response?.data?.detail || "Erro ao carregar as métricas.");
    }
};