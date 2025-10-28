import React, { useState } from "react";

export default function TransactionList({ transactions = [], onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditText(t.text);
    setEditAmount(t.amount);
  };

  const save = (t) => {
    onUpdate(t.id, {...t, text: editText, amount: Number(editAmount)});
    setEditingId(null);
  };

  return (
    <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">Transaction History</h3>
      <ul className="space-y-3 max-h-80 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions yet.</p>
        ) : transactions.map(t => (
          <li key={t.id} className={`flex justify-between items-center p-3 rounded-lg ${t.type === 'income' ? 'bg-green-50/60 border-l-4 border-green-400' : 'bg-red-50/60 border-l-4 border-red-400'}`}>
            <div>
              {editingId === t.id ? (
                <>
                  <input className="input-base mb-2" value={editText} onChange={e=>setEditText(e.target.value)} />
                  <input className="input-base" value={editAmount} onChange={e=>setEditAmount(e.target.value)} type="number" />
                </>
              ) : (
                <>
                  <div className="font-medium text-gray-800 dark:text-gray-100">{t.text}</div>
                  <div className="text-sm text-gray-500">{t.category} • {new Date(t.date).toLocaleDateString()}</div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="font-semibold">{t.type === "income" ? "+" : "-"}${Number(t.amount).toLocaleString()}</div>
              {editingId === t.id ? (
                <button className="px-3 py-1 rounded-md bg-indigo-600 text-white" onClick={()=>save(t)}>Save</button>
              ) : (
                <button className="px-2 py-1 rounded-md text-indigo-700" onClick={()=>startEdit(t)}>✏️</button>
              )}
              <button className="px-2 py-1 rounded-md text-red-600" onClick={()=>onDelete(t.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
