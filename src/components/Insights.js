import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function Insights({ transactions }) {
  const data = [
    { name: "Income", value: transactions.filter(t => t.type === "income").reduce((acc, t) => acc + Number(t.amount), 0) },
    { name: "Expense", value: transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + Number(t.amount), 0) },
  ];

  const COLORS = ["#2a9d8f", "#c62828"];

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Insights</h2>
      <PieChart width={400} height={400}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default Insights;