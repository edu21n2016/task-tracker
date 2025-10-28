import React from "react";

export default function Summary({ income, expense, balance }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-center mb-6">
      <div className="summary-card">
        <h4 className="text-gray-700">💼 Balance</h4>
        <div className="text-2xl font-extrabold mt-2 text-gray-900 dark:text-white">${balance}</div>
      </div>

      <div className="summary-card">
        <h4 className="text-gray-700">📈 Income</h4>
        <div className="text-2xl font-extrabold mt-2 text-green-600">+${income}</div>
      </div>

      <div className="summary-card">
        <h4 className="text-gray-700">📉 Expense</h4>
        <div className="text-2xl font-extrabold mt-2 text-red-600">-${expense}</div>
      </div>
    </div>
  );
}
