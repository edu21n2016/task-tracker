import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Insights({ transactions }) {
  const income = transactions.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);
  const expense = transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount),0);
  const data = [{ name: 'Income', value: income }, { name: 'Expense', value: expense }];
  const COLORS = ['#2a9d8f', '#ef4444'];

  return (
    <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Insights</h2>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
              {data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
