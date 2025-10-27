import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import Insights from "./components/Insights"; // New Insights Component

function App() {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("");

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;
  <nav className="mb-4">
  <Link to="/" className="text-white mx-4">Dashboard</Link>
  <Link to="/insights" className="text-white mx-4">Insights</Link>
</nav>

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400'} text-gray-900 flex flex-col items-center py-10 px-4`}>
        <div className={`bg-white/20 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-5xl p-8 md:p-12 border border-white/30`}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 tracking-tight drop-shadow-lg">
            💸 Expense Tracker Dashboard
          </h1>

          <nav className="mb-4">
            <Link to="/" className="text-white mx-4">Dashboard</Link>
            <Link to="/insights" className="text-white mx-4">Insights</Link>
            <button onClick={() => setDarkMode(!darkMode)} className="text-white">Toggle Dark Mode</button>
          </nav>
          <input
  type="text"
  placeholder="Search by description"
  value={filter}
  onChange={handleFilterChange}
  className="border border-gray-300 p-2 rounded-lg mb-4"
/>

          <Routes>
            <Route path="/" element={
              <>
                <Summary income={income} expense={expense} balance={balance} />
                <input
                  type="text"
                  placeholder="Search by description"
                  value={filter}
                  onChange={handleFilterChange}
                  className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
                />
                <TransactionForm onAdd={addTransaction} />
                <TransactionList
                  transactions={transactions.filter(t => t.description.toLowerCase().includes(filter.toLowerCase()))}
                  onDelete={deleteTransaction}
                />
              </>
            } />
            <Route path="/insights" element={<Insights transactions={transactions} />} />
          </Routes>
        </div>

        <footer className="mt-10 text-white/80 text-sm">
          Built with ❤️ by <span className="font-semibold">Eden Neker</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;