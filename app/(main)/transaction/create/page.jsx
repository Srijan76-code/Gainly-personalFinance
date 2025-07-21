import React from 'react'
import { AddTransactionForm } from '../_components/TransactionForm'
import { getUserAccounts } from '@/actions/dashboard';
import { defaultCategories } from '@/data/categories';
import Divider from '@/components/Divider';

const page = async ({ searchParams }) => {
    const accounts = await getUserAccounts();
    const editId = searchParams?.edit;

    let initialData = null;
    return (
        <div className="max-w-6xl mx-auto px-5">
            <div className="flex text-center justify-center items-center mb-12  ">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent ">Add Transaction</h1>
            </div>
            {/* <Divider/> */}
            <AddTransactionForm accounts={accounts}
                categories={defaultCategories}
                editMode={!!editId}
                initialData={initialData} />
        </div>
    )
}

export default page
