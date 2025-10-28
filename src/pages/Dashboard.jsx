import React, { useMemo, useState } from "react";
import Summary from "../components/Summary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import CategoryBarChart from "../components/CategoryBarChart";

export default function Dashboard({ transactions, addTransaction, updateTransaction, deleteTransaction }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    return transactions.filter(t => t.text.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, search]);

  const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);

  return (
    <>
      <Summary income={income} expense={expense} balance={income - expense} />
      <div className="my-6">
        <input
          className="input-base"
          placeholder="🔎 Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Add New Transaction</h2>
            <TransactionForm onAdd={addTransaction} />
          </div>

          <TransactionList transactions={filtered} onDelete={deleteTransaction} onUpdate={updateTransaction} />
        </div>

        <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">Spending by Category</h3>
          <CategoryBarChart transactions={transactions} />
        </div>
      </div>
    </>
  );
}
