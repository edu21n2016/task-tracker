import React from "react";

function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Transaction History
      </h2>
      <ul className="flex flex-col gap-3 max-h-80 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No transactions added yet.
          </p>
        ) : (
          transactions.map((t) => (
            <li
              key={t.id}
              className={`flex justify-between items-center p-3 rounded-lg border-l-4 shadow-sm transition-all hover:shadow-md ${
                t.type === "income"
                  ? "border-green-500 bg-green-50/60"
                  : "border-red-500 bg-red-50/60"
              }`}
            >
              <span className="text-gray-700 font-medium">{t.text}</span>
              <div className="flex items-center gap-3">
                <span className={`font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-gray-400 hover:text-red-500 text-lg transition-transform hover:scale-110"
                >
                  ✖
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TransactionList;