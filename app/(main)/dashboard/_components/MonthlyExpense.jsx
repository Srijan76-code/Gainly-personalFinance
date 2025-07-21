"use client"

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042",
  "#8dd1e1", "#a4de6c", "#d0ed57", "#ffbb28",
  "#d62728", "#9467bd", "#1f77b4", "#2ca02c",
]

export default function MonthlyExpense({ chartData = [], type }) {
  if (!chartData || chartData.length === 0) return null // Avoid rendering on undefined or empty data

  return (
    <Card className="flex  flex-col bg-[#151419] text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Category Breakdown: {type === "income" ? "Income" : "Expense"}
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full flex justify-center items-center  pb-0">
        <PieChart width={500} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
  contentStyle={{
    backgroundColor: "black",
    borderColor: "#555",
    borderRadius: "12px",
    padding: "0px 16px",
  }}
  itemStyle={{
    color: "white",
    fontSize: "14px",
    
  }}
  labelStyle={{
    color: "#ddd",
    fontWeight: "bold",
    fontSize: "15px",

  }}
  separator=" : "
  formatter={(value, name) => [`₹${value.toFixed(2)}`, name]}
  labelFormatter={(label) => `Category: ${label}`}
/>

          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: '0.5rem',
    fontSize: '0.875rem',
    width: '100%',
  }}/>
        </PieChart>
      </CardContent>
 
      
    </Card>
  )
}
