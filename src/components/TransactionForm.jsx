import React, { useState } from "react";

const defaultCategories = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function TransactionForm({ onAdd }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(defaultCategories[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));

  const submit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    onAdd({
      id: Date.now(),
      text,
      amount: Number(amount),
      type,
      category,
      date
    });
    setText(""); setAmount(""); setType("expense"); setCategory(defaultCategories[0]);
    setDate(new Date().toISOString().slice(0,10));
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input-base" placeholder="Enter description" value={text} onChange={(e)=>setText(e.target.value)} />
      <input className="input-base" placeholder="Enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" step="0.01" />
      <div className="grid grid-cols-2 gap-3">
        <select className="input-base" value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="expense">💸 Expense</option>
          <option value="income">💰 Income</option>
        </select>
        <select className="input-base" value={category} onChange={(e)=>setCategory(e.target.value)}>
          {defaultCategories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <input className="input-base" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      <button className="btn-primary" type="submit">➕ Add Transaction</button>
    </form>
  );
}
