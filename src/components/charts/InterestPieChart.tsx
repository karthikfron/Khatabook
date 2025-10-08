import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useTranslation } from 'react-i18next';

interface PieChartData {
    name: string;
    value: number;
}

interface InterestPieChartProps {
    principal: number;
    interest: number;
}

const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex justify-center gap-8 mt-4">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{entry.value}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {`₹${entry.payload.value.toLocaleString('en-IN')}`}
                    </span>
                </li>
            ))}
        </ul>
    );
};

const COLORS = ['#0d9488', '#f97316']; // Teal for Principal, Orange for Interest

export default function InterestPieChart({ principal, interest }: InterestPieChartProps) {
    const { t } = useTranslation();

    const data: PieChartData[] = [
        { name: t('principal'), value: principal },
        { name: t('interest'), value: interest },
    ];

    const totalRepayment = principal + interest;

    return (
        <div className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        fill="#8884d8"
                        paddingAngle={5}
                        labelLine={false}
                    >
                        <Label
                            value={`₹${totalRepayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
                            position="center"
                            className="text-3xl font-bold fill-slate-800 dark:fill-slate-100"
                        />
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}