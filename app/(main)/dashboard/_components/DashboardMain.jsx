import React from 'react'
import MonthlyBudget from './MonthlyBudget';
import MonthlyExpense from './MonthlyExpense';
import MonthlyTransactions from './MonthlyTransactions';
import { getUserAccounts } from '@/actions/dashboard';
import { getCurrentBudget } from '@/actions/budget';
import Greetings from './Greetings';
import SummaryCards from './SummaryCards';
import { getAccountWithTransactions } from '@/actions/account';
import SmartSuggestion from './SmartSuggest';
import { notFound } from 'next/navigation';
import AccountDrawer from './AccountDrawer';

const DashboardMain = async () => {
    try {
        const accounts = await getUserAccounts();

        if (!accounts || accounts.length === 0) {

            return <div className="space-y-8  w-full text-center text-red-500 p-6">
                <p>

                    No accounts found. Please set up an account first.
                </p>
                <AccountDrawer />

            </div>;
        }

        const defaultAccount = accounts.find((account) => account.isDefault) || accounts[0];

        const defaultAccountName = defaultAccount?.name ?? 'Main Account';
        const defaultAccountId = defaultAccount?.id;

        if (!defaultAccountId) {
            return <div className="text-white p-6">No default account ID found.</div>;
        }

        const accountData = await getAccountWithTransactions(defaultAccountId);
        if (!accountData) {
            return <div className="text-white p-6">No transaction data available for the default account.</div>;
        }

        const { transactions } = accountData;

        // Budget
        let budgetData = null;
        try {
            budgetData = await getCurrentBudget(defaultAccountId);
        } catch (err) {
            console.error("Failed to fetch budget:", err);
        }

        return (
            <div className="pb-1 flex pt-6 pr-6 flex-1 overflow-y-auto scroll-hidden">
                <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-2xl bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-[#1A191E]">
                    <div className="space-y-4 flex flex-col w-full">
                        <Greetings />
                        <SmartSuggestion />
                        <div>
                            <SummaryCards transactions={transactions} />
                        </div>
                        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <MonthlyBudget
                                defaultAccountName={defaultAccountName}
                                initialBudget={budgetData?.budget || 0}
                                currentExpenses={budgetData?.currentExpenses || 0}
                            />
                            <MonthlyTransactions
                                defaultAccount={defaultAccount}
                                accounts={accounts}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (err) {
        console.error("DashboardMain Error:", err);
        return <div className="text-red-500 p-6">Something went wrong loading your dashboard.</div>;
    }
};

export default DashboardMain;
