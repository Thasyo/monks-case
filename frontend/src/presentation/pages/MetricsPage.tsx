import { useState, useEffect, useCallback } from 'react';
import { getMetrics } from '@/domain/usecases/getMetrics';
import type { Metric } from '@/core/entities/User';
import { RotateCw } from 'lucide-react';

//shadcn
import { Button } from '@/components/ui/button'; // Exemplo de path
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ITEMS_PER_PAGE = 20;

function MetricsPage() {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estado para Paginação e Filtros
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState<string>('date');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    // Função de busca encapsulada (para ser reutilizada na paginação/filtros)
    const fetchMetrics = useCallback(async () => {
        setLoading(true);
        setError('');
        
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        
        try {
            const params = {
                skip: skip,
                limit: ITEMS_PER_PAGE,
                order_by: orderBy,
                start_date: startDate || undefined,
                end_date: endDate || undefined,
            };
            
            const results = await getMetrics(params);
            setMetrics(results);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, orderBy, startDate, endDate]);

    // Esse useEffect() recarrega os dados sempre que os parâmetros de consulta mudarem
    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    if (error) return <p className='bg-red-400 mt-2 rounded-xl p-2'>{error}</p>;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-lime-500 text-center">Relatório de Métricas</h2>
            
            {/* --- CONTROLES DE FILTRO E ORDENAÇÃO (Usando Flexbox e Componentes Shadcn) --- */}
            <div className="flex flex-col md:flex-row gap-2 items-end">
                {/* Filtro de Data Início */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="start-date" className="text-sm font-medium">Data Início</label>
                    <Input 
                        id="start-date"
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="w-[180px]"
                    />
                </div>
                
                {/* Filtro de Data Fim */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="end-date" className="text-sm font-medium">Data Fim</label>
                    <Input 
                        id="end-date"
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="w-[180px]"
                    />
                </div>

                {/* Ordenação */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="order-by" className="text-sm font-medium">Ordenar por</label>
                    <Select value={orderBy} onValueChange={setOrderBy}>
                        <SelectTrigger id="order-by" className="w-[180px]">
                            <SelectValue placeholder="Selecione um campo..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="id">ID</SelectItem>
                            <SelectItem value="date">Data</SelectItem>
                            <SelectItem value="account_id">Account</SelectItem>
                            <SelectItem value="campaign_id">Campaign</SelectItem>
                            <SelectItem value="clicks">Clicks</SelectItem>
                            <SelectItem value="conversions">Conversions</SelectItem>
                            <SelectItem value="impressions">Impressions</SelectItem>
                            <SelectItem value="interactions">Interactions</SelectItem>
                            {metrics.length > 0 && metrics[0].cost_micros !== undefined &&
                                (<SelectItem value="cost_micros">Cost_micros</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* --- TABELA DE DADOS --- */}
            <div className="border rounded-md w-full">
                {loading ? (
                    // Animação de Loading Shadcn/ui Style
                    <div className="flex items-center justify-center h-40">
                        <RotateCw className="h-8 w-8 animate-spin text-primary" /> 
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Account</TableHead>
                                <TableHead>Campaign</TableHead>
                                <TableHead>Clicks</TableHead>
                                <TableHead>Conversions</TableHead>
                                <TableHead>Impressions</TableHead>
                                <TableHead>Interactions</TableHead>
                                <TableHead className="text-center">Date</TableHead>
                                {/* Renderização Condicional da Coluna: Cost_micros só para admins */}
                                {metrics.length > 0 && metrics[0].cost_micros !== undefined && (
                                    <TableHead className="text-right">Cost_micros</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {metrics.map((metric) => (
                                <TableRow key={metric.id}>
                                    <TableCell className='text-left'>{metric.id}</TableCell>
                                    <TableCell>{metric.account_id}</TableCell>
                                    <TableCell>{metric.campaign_id}</TableCell>
                                    <TableCell>{metric.clicks}</TableCell>
                                    <TableCell>{metric.conversions}</TableCell>
                                    <TableCell>{metric.impressions}</TableCell>
                                    <TableCell>{metric.interactions}</TableCell>
                                    <TableCell>{metric.date}</TableCell>
                                    {/* Renderização Condicional da Célula */}
                                    {metric.cost_micros !== undefined && (
                                        <TableCell className="text-right">
                                            {metric.cost_micros}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* --- CONTROLES DE PAGINAÇÃO --- */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Exibindo {metrics.length} resultados por página.
                </div>
                <div className="space-x-2">
                    <Button
                        className='bg-lime-300 hover:bg-lime-400 hover:cursor-pointer'
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(c => Math.max(1, c - 1))} 
                        disabled={currentPage === 1 || loading}
                    >
                        Anterior
                    </Button>
                    <span className="text-sm font-medium">Página {currentPage}</span>
                    <Button
                        className='bg-lime-300 hover:bg-lime-400 hover:cursor-pointer'
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(c => c + 1)} 
                        // Checagem se há mais páginas: se o resultado for menor que o limite, esta é a última página
                        disabled={metrics.length < ITEMS_PER_PAGE || loading}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div>
    );

}

export default MetricsPage;


