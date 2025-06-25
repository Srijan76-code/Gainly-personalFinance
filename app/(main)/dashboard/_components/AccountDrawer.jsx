"use client"
import { accountSchema } from '@/app/lib/schema'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import useFetch from '@/app/hooks/use-fetch';
import { createAccount } from '@/actions/dashboard';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';

const AccountDrawer = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false
        }
    })
    const { data: newAccount, loading: createAccountLoading, error, fn: createAccountFn } = useFetch(createAccount)

    useEffect(() => {
        if (newAccount) {
            toast.success("Account created successfully");
            reset();
            setOpen(false);
        }
    }, [newAccount, reset])

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to create account");
        }
    }, [error]);

    const onSubmit = async (data) => {
        await createAccountFn(data);
    }

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>

                {/* To open drawer */}

                <DrawerTrigger >
                    <Card className=" cursor-pointer flex items-center justify-center   h-full bg-[#151419] border-dashed hover:shadow-md hover:shadow-neutral-800 transition-shadow " >
                        <CardContent  >
                            <div className=' flex flex-col justify-center items-center gap-1 '>
                                <p><Plus /></p>
                                <p>Add New Account</p>

                            </div>
                        </CardContent>
                    </Card>
                </DrawerTrigger>


                {/* Inside drawer */}
                <DrawerContent className="bg-[#111014]" >
                    <DrawerHeader  >
                        <DrawerTitle className="px-4 " >Create New Account</DrawerTitle>
                    </DrawerHeader>

                    <div
                        className="shadow-input mx-auto w-full  rounded-none  p-4 md:rounded-2xl md:p-8 ">


                        {/*  form starts from here  */}
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">

                                {/* Account name */}
                                <LabelInputContainer>
                                    <Label htmlFor="name">Account Name</Label>
                                    <Input id="name" placeholder="e.g, Personal" {...register("name")} />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name.message}</p>
                                    )}
                                </LabelInputContainer>

                                {/* Account type */}
                                <LabelInputContainer className="mb-4 ">
                                    <Label htmlFor="type">Account Type</Label>
                                    <Select
                                        onValueChange={(value) => setValue("type", value)}
                                        defaultValue={watch("type")}
                                    >
                                        <SelectTrigger className="w-full bg-[#151419] py-5 cursor-pointer" id="type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#151419] cursor-pointer " >
                                            <SelectItem value="CURRENT">Current</SelectItem>
                                            <SelectItem value="SAVINGS">Savings</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-500">{errors.type.message}</p>
                                    )}
                                </LabelInputContainer>

                            </div>

                            {/* Balance */}
                            <LabelInputContainer className="mb-10">
                                <Label htmlFor="balance">Initial Balance</Label>
                                <Input id="balance"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register("balance")} />
                                {errors.balance && (
                                    <p className="text-sm text-red-500">{errors.balance.message}</p>
                                )}
                            </LabelInputContainer>



                            {/* Default account option */}

                            <Card className="w-full  px-4 bg-[#151419] " >

                                <LabelInputContainer className="">
                                    <div className='flex justify-between items-center ' >

                                        <div  >

                                            <Label htmlFor="isDefault">Set as default</Label>
                                            <p className="text-sm text-muted-foreground">
                                                This account will be selected by default for transactions
                                            </p>
                                        </div>
                                        <Switch className="cursor-pointer" id="isDefault" checked={watch("isDefault")} onCheckedChange={(checked) => setValue("isDefault", checked)} />
                                    </div>
                                </LabelInputContainer>
                            </Card>


                            {/* buttons */}
                            <div className="flex gap-4  pt-4">

                                {/* close button */}
                                <DrawerClose asChild>
                                    <Button type="button" variant="outline" className="cursor-pointer flex-1">
                                        Cancel
                                    </Button>
                                </DrawerClose>


                                {/* submit button */}
                                <Button
                                    type="submit"
                                    className="flex-1 cursor-pointer"
                                    disabled={createAccountLoading}
                                >
                                    {createAccountLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </div>




                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
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

export default AccountDrawer
