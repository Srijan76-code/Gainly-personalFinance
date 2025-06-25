

"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"


// Preparing data to send to the client 
const serializeTransaction =(obj)=>{
    const serialised={...obj}
    if (obj.balance) { serialised.balance=obj.balance.toNumber() }
    if (obj.amount) { serialised.amount=obj.amount.toNumber() }
    return serialised

}


export async function createAccount(data) {
    try {
        // Getting userid from clerk 
        const {userId} = await auth()
        if (!userId) throw new Error("Unauthorized")

        // finding userid in db
        const user =await db.user.findUnique({
            where:{clerkUserId:userId}
        })
        if (!user) throw new Error("User not found")
        
        //Convert balance into float before saving 🙂
        const balanceFloat =parseFloat(data.balance)
        if (isNaN(balanceFloat)) return new Error("Invalid balance amount")
        
        // check if it is the user's first account
        const existingAccounts= db.account.findMany({
            where:{userId:user.id}
        })

        // If it is the first account, make it default , else user's preference
        const shouldBeDefault= existingAccounts.length===0?true:data.isDefault

        //Make other accounts non-default (which is earlier deafult)
        if (shouldBeDefault){
            await db.account.updateMany({
                where:{userId:user.id,isDefault:true},
                data:{isDefault:false}
            })
        }

        // Create new account
        const account =await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                userId:user.id,
                isDefault:shouldBeDefault

            }
        })

        // Serialize the account before returning
        const serialisedAccount= serializeTransaction(account)

        //for instant upadtion
        revalidatePath("/dashboard")

        return {success:true,data:serialisedAccount}

        
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function getUserAccounts() {

        // Getting userid from clerk 
        const {userId} = await auth()
        if (!userId) throw new Error("Unauthorized")

        // finding userid in db
        const user =await db.user.findUnique({
            where:{clerkUserId:userId}
        })
        if (!user) throw new Error("User not found")

        try {
            const accounts= await db.account.findMany({
                where:{userId:user.id},
                orderBy:{createdAt:"desc"},
                include: {
                    _count: {
                      select: {
                        transactions: true,
                      },
                    },
                  },
            })

            const serialisedAccounts= accounts.map(serializeTransaction)
            return serialisedAccounts

        } catch (error) {
            console.error(error.message)
        }

    
}