import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Categories from "./pages/Categories";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const s = localStorage.getItem("txns");
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  // persist
  useEffect(() => {
    localStorage.setItem("txns", JSON.stringify(transactions));
  }, [transactions]);

  // dark mode persistent
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const addTransaction = (txn) => setTransactions((s) => [txn, ...s]);
  const updateTransaction = (id, updated) =>
    setTransactions((s) => s.map((t) => (t.id === id ? updated : t)));
  const deleteTransaction = (id) => setTransactions((s) => s.filter((t) => t.id !== id));

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        <div className="app-shell mx-6 md:mx-auto mt-8 mb-12">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions}
                  addTransaction={addTransaction}
                  updateTransaction={updateTransaction}
                  deleteTransaction={deleteTransaction}
                />
              }
            />
            <Route path="/insights" element={<Insights transactions={transactions} />} />
            <Route
              path="/categories"
              element={<Categories transactions={transactions} />}
            />
          </Routes>
        </div>
        <footer className="text-center text-white/80 mt-6 mb-8">Built with 💙 by Eden Neker</footer>
      </div>
    </Router>
  );
}
