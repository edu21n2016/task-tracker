import React, { useState } from "react";

function TransactionForm({ onAdd }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food"); // Added category state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    onAdd({
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      type,
      category, // Include category in the transaction
    });
    setText("");
    setAmount("");
    setCategory("Food"); // Reset category to default
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Add New Transaction
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter description"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <select
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">💰 Income</option>
          <option value="expense">💸 Expense</option>
        </select>

        <select
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Bills">🧾 Bills</option>
          <option value="Entertainment">🎉 Entertainment</option>
          <option value="Other">🔧 Other</option>
        </select>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-[1.02]"
        >
          ➕ Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;