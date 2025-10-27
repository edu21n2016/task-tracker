import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 text-gray-900 font-[Poppins] flex flex-col items-center py-10 px-4">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-5xl p-8 md:p-12 border border-white/30">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 tracking-tight drop-shadow-lg animate-fade-in">
          💸 Expense Tracker Dashboard
        </h1>

        {/* Summary Section */}
        <Summary income={income} expense={expense} balance={balance} />

        {/* Content Layout */}
        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <TransactionForm onAdd={addTransaction} />
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>
      </div>

      <footer className="mt-10 text-white/80 text-sm">
        Built with ❤️ by <span className="font-semibold">Eden Neker</span>
      </footer>
    </div>
  );
}

export default App;
