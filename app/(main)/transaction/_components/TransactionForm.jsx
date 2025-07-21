"use client"
import useFetch from '@/app/hooks/use-fetch'
import { transactionSchema } from '@/app/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils'
import { toast } from "sonner";

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import AccountDrawer from '../../dashboard/_components/AccountDrawer'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Router } from 'next/router'
import { useRouter, useSearchParams } from 'next/navigation'
import { createTransaction, updateTransaction } from '@/actions/transaction'
import ReceiptScanner from './ReceiptScanner'
import Divider from '@/components/Divider'




export const AddTransactionForm = ({ accounts,
    categories,
    editMode = false,
    initialData = null, }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
        reset,
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues:
            editMode && initialData
                ? {
                    type: initialData.type,
                    amount: initialData.amount.toString(),
                    description: initialData.description,
                    accountId: initialData.accountId,
                    category: initialData.category,
                    date: new Date(initialData.date),
                    isRecurring: initialData.isRecurring,
                    ...(initialData.recurringInterval && {
                        recurringInterval: initialData.recurringInterval,
                    }),
                }
                : {
                    type: "EXPENSE",
                    amount: "",
                    description: "",
                    accountId: accounts.find((ac) => ac.isDefault)?.id,
                    date: new Date(),
                    isRecurring: false,
                },
    })

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
    } = useFetch(editMode ? updateTransaction : createTransaction);


    const router = useRouter()
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const type = watch("type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");

    const filteredCategories = categories.filter(
        (category) => category.type === type
    );

    const onSubmit = (data) => {
        const formData = {
            ...data,
            amount: parseFloat(data.amount),
        };

        if (editMode) {
            transactionFn(editId, formData);
        } else {
            transactionFn(formData);
        }
    };

    useEffect(() => {
        if (transactionResult?.success && !transactionLoading) {
            toast.success(
                editMode
                    ? "Transaction updated successfully"
                    : "Transaction created successfully"
            );
            reset();
            router.push(`/account/${transactionResult.data.accountId}`);
        }
    }, [transactionResult, transactionLoading, editMode]);


        //   AI receipt scanner 
    const handleScanComplete = (scannedData) => {
        if (scannedData) {
          setValue("amount", scannedData.amount.toString());
          setValue("date", new Date(scannedData.date));
          if (scannedData.description) {
            setValue("description", scannedData.description);
          }
          if (scannedData.category) {
            setValue("category", scannedData.category);
          }
          toast.success("Receipt scanned successfully");
        }
      };
    


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full ' >
            {/* AI receipt scanner */}

            {/* Receipt Scanner - Only show in create mode */}
            {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}
            <Divider/>
            {/* Account type */}
            <LabelInputContainer className="mb-4 ">
                <Label htmlFor="type">Account Type</Label>
                <Select
                    onValueChange={(value) => setValue("type", value)}
                    defaultValue={type}
                >
                    <SelectTrigger className="w-full bg-[#151419] py-5 cursor-pointer" id="type">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#151419] cursor-pointer " >
                        <SelectItem className="cursor-pointer" value="EXPENSE">Expense</SelectItem>
                        <SelectItem className="cursor-pointer" value="INCOME">Income</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && (
                    <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
            </LabelInputContainer>

            {/* Amount and Account */}
            <div className="grid  gap-6 md:grid-cols-2">

                {/* Amount */}
                <LabelInputContainer className="">
                    <Label htmlFor="number">Amount</Label>
                    <Input id="number"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("amount")} />
                    {errors.amount && (
                        <p className="text-sm text-red-500">{errors.amount.message}</p>
                    )}
                </LabelInputContainer>



                {/* Account */}
                <LabelInputContainer className="">
                    <Label htmlFor="accountId">Account</Label>
                    <Select
                        onValueChange={(value) => setValue("accountId", value)}
                        defaultValue={getValues("accountId")}
                    >
                        <SelectTrigger className="w-full bg-[#151419] py-5 cursor-pointer" id="accountId">
                            <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#151419] cursor-pointer " >
                            {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name} (${parseFloat(account.balance).toFixed(2)})
                                </SelectItem>
                            ))}
                            {/* <AccountDrawer className="w-fit" >
                                <Button variant="ghost"
                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                                >Create Account</Button>
                            </AccountDrawer> */}
                        </SelectContent>
                    </Select>
                    {errors.accountId && (
                        <p className="text-sm text-red-500">{errors.accountId.message}</p>
                    )}
                </LabelInputContainer>

            </div>


            {/* Category */}
            <LabelInputContainer className="mb-4 ">
                <Label htmlFor="category">Category</Label>
                <Select
                    onValueChange={(value) => setValue("category", value)}
                    defaultValue={getValues("category")}
                >
                    <SelectTrigger className="w-full bg-[#151419] py-5 cursor-pointer" id="category">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#151419] cursor-pointer " >
                        {filteredCategories.map((category) => (
                            <SelectItem className="cursor-pointer" key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
            </LabelInputContainer>

            {/* Date */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full pl-3 text-left font-normal cursor-pointer ",
                                !date && "text-muted-foreground"
                            )}
                        >
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" w-auto p-0" align="start">
                        <Calendar
                            className="bg-[#151419]  cursor-pointer"
                            mode="single"
                            selected={date}
                            onSelect={(date) => setValue("date", date)}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
            </div>



            {/* Description  */}
            <LabelInputContainer>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
            </LabelInputContainer>


            {/* Recurring Toggle */}
            <Card className="w-full  px-4 bg-[#151419] " >

                <LabelInputContainer className="">
                    <div className='flex justify-between items-center ' >

                        <div  >

                            <Label htmlFor="isRecurring">Recurring Transaction</Label>
                            <p className="text-sm text-muted-foreground">
                                Set up a recurring schedule for this transaction
                            </p>
                        </div>
                        <Switch className="cursor-pointer" id="isRecurring" checked={isRecurring} onCheckedChange={(checked) => setValue("isRecurring", checked)} />
                    </div>
                </LabelInputContainer>
            </Card>

            {/* Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer "
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" className="cursor-pointer" disabled={transactionLoading}>
                    {transactionLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {editMode ? "Updating..." : "Creating..."}
                        </>
                    ) : editMode ? (
                        "Update Transaction"
                    ) : (
                        "Create Transaction"
                    )}
                </Button>
            </div>


        </form>
    )
}


const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};