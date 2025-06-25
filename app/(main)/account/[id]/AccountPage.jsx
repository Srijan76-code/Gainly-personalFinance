// app/account/[id]/AccountPage.jsx
import { getAccountWithTransactions } from '@/actions/account';
import { Suspense } from 'react';
import TransactionTable from './_components/TransactionTable';
import { BarLoader } from "react-spinners";
import { notFound } from 'next/navigation';
import { AccountChart } from './_components/AccountChart';

const AccountPage = async ({ id }) => {
  const accountData = await getAccountWithTransactions(id);
  if (!accountData) notFound();

  const { transactions } = accountData;

  return (
    <div className='space-y-8 px-6 flex-1 overflow-y-auto scroll-hidden'>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <AccountChart transactions={transactions} />
      </Suspense>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
