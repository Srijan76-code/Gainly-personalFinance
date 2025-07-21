"use client"


import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"


import { Pencil, Check, X } from "lucide-react";

import { toast } from "sonner";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";
import useFetch from "@/app/hooks/use-fetch"
import { Badge } from "@/components/ui/badge"

export default function MonthlyBudget({defaultAccountName, initialBudget, currentExpenses }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };
const [chartprogress,setChartProgress]=useState(((360*percentUsed)/100))
  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      
      setChartProgress((360*(currentExpenses/parseFloat(newBudget))))
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);



    const chartData = [
      {
        name: "Spent",
        value: Number(percentUsed) || 0,
        fill: percentUsed >= 90 ? "#C70036" : "#9333ea",
      },
    ];
    

  
  const chartConfig = {
    type: "radial-bar",
    legend: false,
    tooltip: false,
    className: "w-full h-full",
    colors: ["#9333ea"], 
  }








  return (
    <Card className="flex flex-col bg-[#151419]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="flex justify-between px-4">
            <div>Monthly Budget (Default Account)</div>
            <Badge className="capitalize" >{defaultAccountName} account</Badge>
            
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">


          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">

        <ChartContainer
          config={chartConfig}
          className="mx-auto  aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={chartprogress}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-white last:fill-[#151419]"
              polarRadius={[86, 74]}
            />
            <RadialBar  dataKey="value" background cornerRadius={10} />

            <PolarRadiusAxis  type="number" domain={[0, 100]} tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="space-y-2"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-purple-400 text-xl font-semibold"
                        >
                          ${currentExpenses}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-white font-light text-sm"
                        >
                          {(percentUsed).toFixed(2)}% used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />

            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        
      </CardContent>

      <CardFooter className="flex justify-center" >
      
              <CardTitle className=""  >
                {initialBudget
                  ?
                  <div className="gap-4 flex justify-between items-center " >
                    <div>
                      <span className="font-medium text-sm" >Total expenses: </span>
                      <span className="text-purple-400" >$ {currentExpenses?.toFixed(2)} </span>
                      
                    </div>
                    
                    <div className="flex  items-center gap-2">
                      <span className="font-medium text-sm">Total Budget: </span>
                      {isEditing ? (
                        <div className="flex items-center gap-2 ">
                          <Input
                            type="number"
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                            className="w-32"
                            placeholder="Enter amount"
                            autoFocus
                            disabled={isLoading}
                          />
                          <Button
                            className="h-7 w-7 cursor-pointer"
                            size="icon"
                            onClick={handleUpdateBudget}
                            disabled={isLoading}
                          >
                            <Check strokeWidth={3} className="h-4 w-4  text-green-600" />
                          </Button>
                          <Button
                           className="h-7 w-7 cursor-pointer"
                            size="icon"
                            onClick={handleCancel}
                            disabled={isLoading}
                          >
                            <X strokeWidth={3} className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      ) :
                        (<><span className="text-green-400">$ {initialBudget.amount.toFixed(2)}</span>
                          <span className="" >
                            <Button
                              
                              size="icon"
                              onClick={() => setIsEditing(true)}
                              className="h-7 w-9 cursor-pointer"
                            >
                              <Pencil className="h-2 w-2  text-red-600 " />
                            </Button>
                          </span></>)


                      }

                    </div>
                  </div>

                  : "No budget set"}
              </CardTitle>

            
      </CardFooter>

    </Card>
  )
}
