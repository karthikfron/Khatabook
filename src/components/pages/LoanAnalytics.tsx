import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import InterestPieChart from '../charts/InterestPieChart';
import LoanGrowthBarChart from '../charts/LoanGrowthBarChart';
import { calculateCompoundInterest, calculateSimpleInterest, generateLoanGrowthData, InterestType } from '../../utils/tools.ts';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
    return (
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
            <div className={`p-3 rounded-full ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            </div>
        </div>
    );
}

export default function LoanAnalytics() {
    const { t } = useTranslation();
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(5);
    const [time, setTime] = useState(24); // in months
    const [interestType, setInterestType] = useState<InterestType>('compound');

    const { totalInterest, growthData } = useMemo(() => {
        const timeInYears = time / 12;
        const interest = interestType === 'compound'
            ? calculateCompoundInterest(principal, rate, timeInYears)
            : calculateSimpleInterest(principal, rate, timeInYears);

        const data = generateLoanGrowthData(principal, rate, time, interestType);
        return { totalInterest: interest, growthData: data };
    }, [principal, rate, time, interestType]);

    const totalRepayment = principal + totalInterest;

    return (
        <div className="min-h-full p-4 font-sans md:p-8 bg-slate-50 dark:bg-slate-900">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">{t('loan_simulator')}</h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400">{t('loan_simulator_desc')}</p>
            </header>

            {/* --- Key Metrics --- */}
            <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
                <StatCard icon={<MonetizationOnOutlinedIcon className="text-teal-800 dark:text-teal-200" />} label={t('principal_amount')} value={`₹${principal.toLocaleString('en-IN')}`} color="bg-teal-100 dark:bg-teal-900/50" />
                <StatCard icon={<TrendingUpOutlinedIcon className="text-orange-800 dark:text-orange-200" />} label={t('total_interest')} value={`₹${totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} color="bg-orange-100 dark:bg-orange-900/50" />
                <StatCard icon={<AccountBalanceWalletOutlinedIcon className="text-sky-800 dark:text-sky-200" />} label={t('total_repayment')} value={`₹${totalRepayment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} color="bg-sky-100 dark:bg-sky-900/50" />
            </div>

            <div className="p-8 mb-10 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
                {/* --- Interest Type Toggle --- */}
                <div className="flex items-center justify-center mb-8">
                    <span className={`px-4 py-2 cursor-pointer rounded-l-lg text-lg font-semibold ${interestType === 'simple' ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`} onClick={() => setInterestType('simple')}>
                        {t('simple_interest')}
                    </span>
                    <span className={`px-4 py-2 cursor-pointer rounded-r-lg text-lg font-semibold ${interestType === 'compound' ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`} onClick={() => setInterestType('compound')}>
                        {t('compound_interest')}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    <div className="space-y-3">
                        <label htmlFor="principal" className="block text-lg font-semibold text-slate-700 dark:text-slate-300">{t('principal_amount')}</label>
                        <input
                            type="number"
                            id="principal"
                            value={principal}
                            onChange={(e) => setPrincipal(Number(e.target.value))}
                            className="w-full p-3 text-xl font-semibold rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <input type="range" min="1000" max="1000000" step="1000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-teal-600" />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="rate" className="block text-lg font-semibold text-slate-700 dark:text-slate-300">{t('annual_rate_percent')}</label>
                        <input
                            type="number"
                            id="rate"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full p-3 text-xl font-semibold rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <input type="range" min="1" max="30" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-teal-600" />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="time" className="block text-lg font-semibold text-slate-700 dark:text-slate-300">{t('time_months')}</label>
                        <input
                            type="number"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(Number(e.target.value))}
                            className="w-full p-3 text-xl font-semibold rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <input type="range" min="6" max="120" step="1" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-teal-600" />
                    </div>
                </div>
            </div>

            {/* --- Charts --- */}
            <div className="flex flex-col items-center gap-8">
                {/* Pie Chart - Centered and more prominent */}
                <div className="w-full p-6 bg-white shadow-lg lg:w-3/4 xl:w-1/2 dark:bg-slate-800 rounded-xl">
                    <h2 className="mb-2 text-xl font-bold text-center text-slate-800 dark:text-slate-100">{t('repayment_breakdown')}</h2>
                    <p className="mb-4 text-sm text-center text-slate-500 dark:text-slate-400">{t('repayment_breakdown_desc')}</p>
                    <InterestPieChart principal={principal} interest={totalInterest} />
                </div>

                {/* Bar Chart - Full width underneath */}
                <div className="w-full p-6 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
                    <h2 className="mb-2 text-xl font-bold text-slate-800 dark:text-slate-100">{t('monthly_loan_growth')}</h2>
                    <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t('monthly_loan_growth_desc')}</p>
                    <LoanGrowthBarChart data={growthData} />
                </div>
            </div>
        </div>
    );
}