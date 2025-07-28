"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
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
import { ArrowDownUp, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, MoreHorizontal, RefreshCcw, RefreshCw, Search, Trash, X } from 'lucide-react'
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
import { bulkDeleteTransactions } from '@/actions/account'
import useFetch from '@/app/hooks/use-fetch'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarLoader } from 'react-spinners'
import { toast } from 'sonner'


const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};





const TransactionTable = ({ transactions }) => {

    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc"
    })
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [recurringFilter, setRecurringFilter] = useState("");




    // Memoized filtered and sorted transactions
    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions];

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter((transaction) =>
                transaction.description?.toLowerCase().includes(searchLower)
            );
        }

        // Apply type filter
        if (typeFilter) {
            result = result.filter((transaction) => transaction.type === typeFilter);
        }

        // Apply recurring filter
        if (recurringFilter) {
            result = result.filter((transaction) => {
                if (recurringFilter === "recurring") return transaction.isRecurring;
                return !transaction.isRecurring;
            });
        }
        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;

            switch (sortConfig.field) {
                case "date":
                    comparison = new Date(a.date) - new Date(b.date);
                    break;
                case "amount":
                    comparison = a.amount - b.amount;
                    break;
                case "category":
                    comparison = a.category.localeCompare(b.category);
                    break;
                default:
                    comparison = 0;
            }

            return sortConfig.direction === "asc" ? comparison : -comparison;
        });

        return result;
    }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);








    // pagination 

    const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSelectedIds([]); // Clear selections on page change
    }
    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedTransactions.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );
    }, [filteredAndSortedTransactions, currentPage])


    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction:
                current.field === field && current.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSelect = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedIds((current) =>
            current.length === paginatedTransactions.length
                ? []
                : paginatedTransactions.map((t) => t.id)
        );
    };

    const {
        loading: deleteLoading,
        fn: deleteFn,
        data: deleted,
    } = useFetch(bulkDeleteTransactions);

    // const handleBulkDelete = async () => {
    //     if (
    //         !window.confirm(
    //             `Are you sure you want to delete ${selectedIds.length} transactions?`
    //         )
    //     )
    //         return;

    //     deleteFn(selectedIds);
    // };
    const handleConfirmDelete = () => {
        deleteFn(selectedIds);
        setDialogOpen(false);
      };

    useEffect(() => {
        if (deleted && !deleteLoading) {
            toast.error("Transactions deleted successfully");
            setSelectedIds([])
        }
    }, [deleted, deleteLoading]);

    const handleClearFilters = () => {
        setSearchTerm("");
        setTypeFilter("");
        setRecurringFilter("");
        setCurrentPage(1);
    };


    return (

        <div className='space-y-8 ' >

            {deleteLoading && (
                <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
            )}
            {/* Filters */}
            <div className="flex items-center flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-8"
                    />
                </div>
                <div className="flex gap-4 ">
                    <Select

                        value={typeFilter}
                        onValueChange={(value) => {
                            setTypeFilter(value);
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className=" cursor-pointer w-[130px]">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="cursor-pointer" value="INCOME">Income</SelectItem>
                            <SelectItem className="cursor-pointer" value="EXPENSE">Expense</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={recurringFilter}
                        onValueChange={(value) => {
                            setRecurringFilter(value);
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className=" cursor-pointer w-[130px]">
                            <SelectValue placeholder="All Transactions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="cursor-pointer" value="recurring">Recurring Only</SelectItem>
                            <SelectItem className="cursor-pointer" value="non-recurring">Non-recurring Only</SelectItem>
                        </SelectContent>
                    </Select>


                    {/* Bulk Actions */}
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-2">
                            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button className="cursor-pointer" variant="destructive" size="sm">
                                        <Trash className="h-4 w-4 " />
                                        Delete Selected ({selectedIds.length})
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete <strong>{selectedIds.length}</strong> transactions?
                                            This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer" >Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="cursor-pointer" onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>

                    )}

                    {(searchTerm || typeFilter || recurringFilter) && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleClearFilters}
                            title="Clear filters"
                        >
                            <X className=" cursor-pointer h-4 w-5" />
                        </Button>
                    )}
                </div>
            </div>


            {/* Transaction Table */}



            <div className='border rounded-md bg-[#151419]   ' >
                <Table   >

                    {/* Header of table */}
                    <TableHeader className="  " >
                        <TableRow className="font-semibold text-md  " >

                            {/* Checkbox */}
                            <TableHead className="w-[50px] px-4 ">
                                <Checkbox
                                    checked={
                                        selectedIds.length === paginatedTransactions.length &&
                                        paginatedTransactions.length > 0
                                    }
                                    onCheckedChange={handleSelectAll} className="cursor-pointer" /></TableHead>

                            {/* Date */}
                            <TableHead className="cursor-pointer" onClick={() => handleSort("date")} >
                                <div className='flex items-center' >
                                    <ArrowDownUp className='mr-1  h-4 w-4' />
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
                                    <ArrowDownUp className='mr-1  h-4 w-4' />
                                    Category
                                    {sortConfig.field === "category" && (
                                        sortConfig.direction === "asc" ? (<ChevronUp className='ml-1  h-4 w-4' />) : (<ChevronDown className='ml-1 h-4 w-4' />)
                                    )}
                                </div>
                            </TableHead>

                            {/* Amount */}
                            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")} >
                                <div className='flex items-center' >
                                    <ArrowDownUp className='mr-1  h-4 w-4' />
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
                                    <Checkbox
                                        checked={selectedIds.includes(id)}
                                        onCheckedChange={() => handleSelect(id)}
                                        className="cursor-pointer" />
                                </TableCell>

                                {/* date */}
                                <TableCell>{format(new Date(date), "PP")}</TableCell>

                                {/* description */}
                                <TableCell   >{description}</TableCell>

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
                                                onClick={() => deleteFn([id])}
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
