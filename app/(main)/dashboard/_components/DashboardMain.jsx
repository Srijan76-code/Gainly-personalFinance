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



const DashboardMain = async () => {
    const accounts = await getUserAccounts()
    const defaultAccount = accounts?.find((account) => account.isDefault);

    const defaultAccountName = defaultAccount?.name
    const defaultAccountId = defaultAccount?.id

    // transactions
    const accountData = await getAccountWithTransactions(defaultAccountId);
    if (!accountData) notFound();
    const { transactions } = accountData;

    // Get budget for default account
    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }


    return (
        <div className="  pb-1 flex pt-6 pr-6 flex-1 overflow-y-auto scroll-hidden">
            <div
                className="flex h-full w-full flex-1 flex-col gap-2 rounded-2xl  bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-[#1A191E]">

                <div className="space-y-4 flex flex-col w-full  ">
                    <Greetings />
                    <SmartSuggestion/>
                    <div className=' ' >
                        <SummaryCards transactions={transactions} />
                    </div>
                    <div className='mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8  ' >

                        <MonthlyBudget defaultAccountName={defaultAccountName} initialBudget={budgetData?.budget}
                            currentExpenses={budgetData?.currentExpenses==0 && 57604} />
                        

                        <MonthlyTransactions defaultAccount={defaultAccount} accounts={accounts} />
                    </div>



                </div>
            </div>
        </div>
    );
}

export default DashboardMain
