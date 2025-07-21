

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import CustomPieChart from './CustomPieChart';
import MonthlyExpense from './MonthlyExpense';

const SummaryCards = ({ transactions }) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 4);




    // Last one month transactions
    const recentTransactions = transactions.filter(entry => new Date(entry.date) >= oneMonthAgo);

    const totalIncome = recentTransactions
        .filter(v => v.type === 'INCOME')
        .reduce((sum, v) => sum + v.amount, 0);

    const totalExpense = recentTransactions
        .filter(v => v.type === 'EXPENSE')
        .reduce((sum, v) => sum + v.amount, 0);
    const netWorth = totalIncome - totalExpense




    // category-wise totals
    const tailwindColorMap = {
        "bg-green-700": "#15803d",
        "bg-cyan-700": "#0e7490",
        "bg-indigo-700": "#4338ca",
        "bg-pink-700": "#be185d",
        "bg-amber-700": "#b45309",
        "bg-slate-700": "#334155",
        "bg-red-700": "#b91c1c",
        "bg-orange-700": "#c2410c",
        "bg-lime-700": "#4d7c0f",
        "bg-violet-700": "#6d28d9",
        "bg-rose-700": "#be123c",
        "bg-pink-600": "#db2777",
        "bg-teal-700": "#0f766e",
        "bg-fuchsia-700": "#a21caf",
        "bg-sky-700": "#0369a1",
        "bg-rose-600": "#e11d48",
        "bg-slate-600": "#475569"
    };

    const categoryTotals = {};

    recentTransactions.forEach(entry => {
        if (!categoryTotals[entry.category]) {
            categoryTotals[entry.category] = {
                amount: entry.amount,
                type: entry.type
            };
        } else {
            categoryTotals[entry.category].amount += entry.amount;
        }
    });

    const chartData = Object.entries(categoryTotals).map(([name, data]) => ({
        name,
        value: data.amount,
        type: data.type,
    }));
    const incomeChartData = chartData.filter(d => d.type === "INCOME");
    const expenseChartData = chartData.filter(d => d.type === "EXPENSE");
    console.log(incomeChartData)



    // Upcoming bills
    const today = new Date();

    const upcomingRecurringBills = transactions.filter(entry =>
        entry.isRecurring &&
        entry.type === 'EXPENSE' &&
        entry.nextRecurringDate &&
        new Date(entry.nextRecurringDate) >= today
    );





    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Net Worth */}
                <Card className="bg-[#151419]   text-white rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground ">Net Worth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl  font-bold">₹ {netWorth.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2 text-purple-500 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        +4% from last month
                    </CardFooter>
                </Card>
                {/* Income Card */}
                <Card className="bg-[#151419]   text-white rounded-2xl shadow-md">

                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl  font-bold">₹ {totalIncome.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2 text-green-400 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        +5% from last month
                    </CardFooter>
                </Card>

                {/* Expense Card */}
                <Card className="bg-[#151419]   text-white rounded-2xl shadow-md">

  


                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Expense</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold ">₹ {totalExpense.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2 text-red-400 text-sm">
                        <TrendingDown className="h-4 w-4" />
                        -3% from last month
                    </CardFooter>
                </Card>

                {/* Upcoming Recurring Bills */}


                {/* <Card className="bg-[#151419] hover:bg-[#431C90] hover:shadow-md hover:shadow-neutral-800 transition-shadow text-white rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-sm text-white/80">Upcoming Bills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {upcomingRecurringBills.length > 0 ? (
                            <ul className="space-y-1 text-sm">
                                {upcomingRecurringBills.map((bill) => (
                                    <li key={bill.id} className="flex justify-between">
                                        <span>{bill.description}</span>
                                        <span className="text-right text-white/60">
                                            ₹{bill.amount.toFixed(2)}<br />
                                            <span className="text-xs">
                                                {new Date(bill.nextRecurringDate).toLocaleDateString()}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-white/50">No upcoming bills.</p>
                        )}
                    </CardContent>
                </Card> */}
            </div>

            <div className="grid grid-cols-1 mt-20  lg:grid-cols-2 gap-8" >
                {/* Category Breakdown */}

                <MonthlyExpense chartData={expenseChartData} type="expense" />
                <MonthlyExpense chartData={incomeChartData} type="income" />

            </div>
        </>
    );
}

export default SummaryCards
