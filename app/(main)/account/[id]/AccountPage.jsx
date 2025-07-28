// app/account/[id]/AccountPage.jsx
import { getAccountWithTransactions } from '@/actions/account';
import { Suspense } from 'react';
import TransactionTable from './_components/TransactionTable';
import { BarLoader } from "react-spinners";
import { notFound } from 'next/navigation';
import { AccountChart } from './_components/AccountChart';
import Divider from '@/components/Divider';

const AccountPage = async ({ id }) => {
  const accountData = await getAccountWithTransactions(id);
  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className='space-y-16 mt-12 px-6 flex-1 overflow-y-auto scroll-hidden'>

      <div className="flex gap-4 items-end justify-between">

        <div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl text-green-500 sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>


      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <div className='space-y-4' >
          <p className=' bg-gradient-to-br from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent   font-bold flex text-sm sm:text-lg lg:text-2xl ' >
            Account Chart</p>

          <AccountChart transactions={transactions} />
        </div>


      </Suspense>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <div className='space-y-4  ' >
          <p className='mb-4 bg-gradient-to-br from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent   font-bold flex text-sm sm:text-lg lg:text-2xl ' >
            Transaction Table ({account._count.transactions} transactions)</p>
          <TransactionTable transactions={transactions} />
        </div>
      </Suspense>
    </div>
  );
};

export default AccountPage;
