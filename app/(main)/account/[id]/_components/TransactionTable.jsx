"use client"
import React, { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowDownUp, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, MoreHorizontal, RefreshCcw, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'
import { categoryColors } from '@/data/categories'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};





const TransactionTable = ({ transactions }) => {

    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc"
    })


    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction:
                current.field === field && current.direction === "asc" ? "desc" : "asc",
        }));
    };


// pagination 

    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSelectedIds([]); // Clear selections on page change
    }
    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return transactions.slice( 
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );
      }, [transactions, currentPage])



    return (

        <div className='space-y-8' >
            <div className='border rounded-md bg-[#151419]   ' >
                <Table   >

                    {/* Header of table */}
                    <TableHeader className="  " >
                        <TableRow className="font-semibold text-md  " >

                            {/* Checkbox */}
                            <TableHead className="w-[50px] px-4 "><Checkbox className="cursor-pointer" /></TableHead>

                            {/* Date */}
                            <TableHead className="cursor-pointer" onClick={() => handleSort("date")} >
                                <div className='flex items-center' >
                                    <ArrowDownUp className='mr-1  h-4 w-4'/>
                                    Date
                                    {sortConfig.field === "date" && (
                                        sortConfig.direction === "asc" ? (<ChevronUp className='ml-1  h-4 w-4' />) : (<ChevronDown className='ml-1 h-4 w-4' />)
                                    )}
                                </div>
                            </TableHead>

                            {/* Description */}
                            <TableHead>Description</TableHead>

                            {/* Category */}
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")} >
                                <div className='flex items-center' >
                                <ArrowDownUp className='mr-1  h-4 w-4'/>
                                    Category
                                    {sortConfig.field === "category" && (
                                        sortConfig.direction === "asc" ? (<ChevronUp className='ml-1  h-4 w-4' />) : (<ChevronDown className='ml-1 h-4 w-4' />)
                                    )}
                                </div>
                            </TableHead>

                            {/* Amount */}
                            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")} >
                                <div className='flex items-center' >
                                <ArrowDownUp className='mr-1  h-4 w-4'/>
                                    Amount
                                    {sortConfig.field === "amount" && (
                                        sortConfig.direction === "asc" ? (<ChevronUp className='ml-1  h-4 w-4' />) : (<ChevronDown className='ml-1 h-4 w-4' />)
                                    )}
                                </div>
                            </TableHead>

                            {/* Recurring */}
                            <TableHead>Recurring</TableHead>

                            <TableHead className="w-[50px]" />

                        </TableRow>
                    </TableHeader>


                    {/*Table Body starts here   */}
                    <TableBody  >
                        {paginatedTransactions.length === 0 ? (

                            <TableRow  >
                                <TableCell colSpan={7} className=" text-center text-muted-foreground ">No transactions found</TableCell>
                            </TableRow>

                        ) : (paginatedTransactions.map(({ nextRecurringDate, isRecurring, recurringInterval, id, amount, category, type, description, date }) => (

                            <TableRow key={id} >

                                {/* Ckeckbox */}
                                <TableCell className="px-4" >
                                    <Checkbox className="cursor-pointer" />
                                </TableCell>

                                {/* date */}
                                <TableCell>{format(new Date(date), "PP")}</TableCell>

                                {/* description */}
                                <TableCell>{description}</TableCell>

                                {/* category */}
                                <TableCell >
                                    <span className={`text-white text-sm px-2 py-1 rounded ${categoryColors[category]}`}>
                                        {category}
                                    </span>
                                </TableCell>

                                {/* amount */}
                                <TableCell className={` font-medium text-left ${type === "EXPENSE" ? "text-red-500" : "text-green-500"}`} >
                                    {type === "EXPENSE" ? "-" : "+"} $ {amount.toFixed(2)}
                                </TableCell>

                                {/* Recurring */}
                                <TableCell>
                                    {isRecurring ? (

                                        // if recurring
                                        <Tooltip>
                                            <TooltipTrigger>
                                                < Badge className="gap-1 bg-purple-200 text-purple-800 hover:bg-purple-200" variant="secondary" >
                                                    <RefreshCw />
                                                    {
                                                        RECURRING_INTERVALS[recurringInterval]
                                                    }
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent className="">
                                                <div className="text-sm ">
                                                    <div className="">Next Date:</div>
                                                    <div>
                                                        {format(
                                                            new Date(nextRecurringDate),
                                                            "PPP"
                                                        )}
                                                    </div>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>


                                    ) : (
                                        // if not recurring
                                        <Badge className="gap-1" variant="outline" >
                                            <Clock className='h-3 w-3' />
                                            one-time
                                        </Badge>
                                    )}

                                </TableCell>

                                {/*  */}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className=" cursor-pointer w-8 h-8" >
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>


                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel className="cursor-pointer"
                                                onClick={() => router.push(`/transaction/create?edit=${id}`)}>Edit</DropdownMenuLabel>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem className=" cursor-pointer text-destructive"
                                            // onClick={() => deleteFn([id])}
                                            >Delete</DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                            </TableRow>

                        )
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                    <Button
                    className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                    className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-3 w-3" />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default TransactionTable
