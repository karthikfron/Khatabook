import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

interface LoanData {
    month: number;
    year: number;
    interest: number;
    principal: number;
    total: number;
}

interface LoanGrowthBarChartProps {
    data: LoanData[];
}

export default function LoanGrowthBarChart({ data }: LoanGrowthBarChartProps) {
    const { t } = useTranslation();

    // The data from generateLoanGrowthData has cumulative total.
    // We need to calculate the principal portion for a stacked bar chart.
    const chartData = useMemo(() => data.map(d => ({
        ...d,
        principal: d.total - d.interest,
    })), [data]);

    return (
        <div className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: t('time_months'), position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis label={{ value: `${t('amount')} (₹)`, angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                    <Legend />
                    <Bar dataKey="principal" stackId="a" fill="#0d9488" name={t('principal')} />
                    <Bar dataKey="interest" stackId="a" fill="#f97316" name={t('interest')} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}