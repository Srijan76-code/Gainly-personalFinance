
"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }
    return serialized;
};


export async function updateDefaultAccount(accountId) {

    try {
        
        // Getting userid from clerk 
        const { userId } = await auth()
        if (!userId) throw new Error("Unauthorized")
    
        // finding userid in db
        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        })
        if (!user) throw new Error("User not found")
    
        // Firstly , unset any default account
        await db.account.updateMany({
            where: { userId: user.id, isDefault: true },
            data: { isDefault: false }
        })
    
        // Then set the new default account
        const account = await db.account.update({
            where:{
                id:accountId,
                userId:user.id
            },
            data:{
                isDefault:true
            }
        })
    
        revalidatePath("/dashboard")
    
        return {success:true,data:serializeTransaction(account)}
    } catch (error) {
        return { success: false, error: error.message }
    }


}

export async function getAccountWithTransactions(accountId) {

            // Getting userid from clerk 
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
        
            // finding userid in db
            const user = await db.user.findUnique({
                where: { clerkUserId: userId }
            })
            if (!user) throw new Error("User not found")

                const account= await db.account.findUnique({
                    where:{
                        id:accountId,
                        userId:user.id,

                    },
                    include:{
                        transactions:{
                            orderBy:{
                                date:"desc"
                            }
                        },
                        _count:{
                            select:{transactions:true}
                        }
                    }
                })

                if (!account) return null
                return { ...serializeTransaction(account), transactions:account.transactions.map(serializeTransaction) }
}