"use client";

import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { getAccountWithTransactions } from '@/actions/account';
import { format } from "date-fns";
import { Loader } from 'lucide-react';
import { categoryColors } from '@/data/categories';


const MonthlyTransactions = ({ accounts,defaultAccount }) => {
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(defaultAccount.id);
  const [selectedName, setSelectedName] = useState(defaultAccount.name);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      
      if (!selectedId) return;
      setLoading(true)
      const accountData = await getAccountWithTransactions(selectedId);
      if (accountData?.transactions) {
        setTransactions(accountData.transactions.slice(0, 5));
      } else {
        setTransactions([]);
      }
      setLoading(false)
    };

    fetchTransactions();

  }, [selectedId]);

  const handleAccount = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
  };

  return (
    <Card className="w-full bg-[#151419] px-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Transactions</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>{selectedName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {accounts.map(({ id, name }) => (
                <DropdownMenuItem key={id} onClick={() => handleAccount(id, name)}>
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>



      <CardContent>
        {loading ? (
          <Loader className="animate-spin transition w-full text-center" />
        ) : transactions.length === 0 ? (
          <p className="text-muted-foreground w-full text-center">No transactions found</p>
        ) : (
          transactions.map(({ id, amount, type, description, date, category }) => (
            <div key={id} className="flex justify-between items-center py-2">
              <div>
                <p>{description}</p>
                <CardDescription>{format(new Date(date), "PP")}</CardDescription>
              </div>
              <div className='space-y-1 ' >
                <div className={`text-left ${type === "EXPENSE" ? "text-red-500" : "text-green-500"}`}>
                  {type === "EXPENSE" ? "-" : "+"} ${amount.toFixed(2)}
                </div>
                <div className={`text-white text-center text-sm px-2 py-1 rounded ${categoryColors[category]}`}>
                  {category}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>




    </Card>
  );
};

export default MonthlyTransactions;
