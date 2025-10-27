import React from "react";

function Summary({ income, expense, balance }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-center mb-10">
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-gray-600 font-medium">💼 Balance</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">${balance}</p>
      </div>
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-gray-600 font-medium">📈 Income</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">+${income}</p>
      </div>
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-gray-600 font-medium">📉 Expense</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">-${expense}</p>
      </div>
    </div>
  );
}

export default Summary;
