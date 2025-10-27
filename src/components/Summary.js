import React from "react";

function Summary({ income, expense, balance }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-4xl mb-6">
      <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg w-full md:w-1/3 text-center hover:shadow-2xl transition-all duration-300">
        <h3 className="text-gray-600">Balance</h3>
        <p className="text-2xl font-bold text-gray-800">${balance}</p>
      </div>
      <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg w-full md:w-1/3 text-center hover:shadow-2xl transition-all duration-300">
        <h3 className="text-gray-600">Income</h3>
        <p className="text-2xl font-bold text-green-600">+${income}</p>
      </div>
      <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg w-full md:w-1/3 text-center hover:shadow-2xl transition-all duration-300">
        <h3 className="text-gray-600">Expense</h3>
        <p className="text-2xl font-bold text-red-600">-${expense}</p>
      </div>
    </div>
  );
}

export default Summary;