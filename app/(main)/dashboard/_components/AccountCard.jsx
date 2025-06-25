import { getUserAccounts } from '@/actions/dashboard'

import React, { Suspense } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Loader, TrendingDown, TrendingUp } from 'lucide-react'

import DefaultSwitch from './DefaultSwitch'
import Link from 'next/link'
import { BarLoader } from 'react-spinners'
const AccountCard = async () => {
    const accounts = await getUserAccounts()

    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 ' >
            {accounts.map(({ id, name, balance, type, isDefault }) => (

                <Card key={id} className="cursor-pointer h-48 w-full  bg-[#151419]  hover:shadow-md hover:shadow-neutral-800 transition-shadow " >
                    
                    <Link className='space-y-4' href={`/account/${id}`}>
                        <CardHeader>
                            <div className='flex justify-between items-center ' >
                                <CardTitle>{name}</CardTitle>
                                <DefaultSwitch isDefault={isDefault} id={id} />
                            </div>

                        </CardHeader>

                        <CardContent>
                            <p className='font-bold text-xl text-green-500' >${parseFloat(balance).toFixed(2)}</p>
                            <CardDescription>{type.charAt(0) + type.slice(1).toLowerCase()} Account</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between" >
                            <div className='flex items-center gap-1 '>
                                <TrendingUp className='text-green-600' />Income

                            </div>
                            <div className='flex items-center gap-1' >
                                <TrendingDown className='text-red-600' />
                                Expense
                            </div>
                        </CardFooter>
                    </Link>
                   
                </Card>
            ))}
        </div>
    )
}

export default AccountCard
