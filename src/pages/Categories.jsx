import React from "react";

function CategoryPage({ transactions }) {
  const categories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
        📊 Spending by Category
      </h2>

      {categories.length === 0 ? (
        <p className="text-gray-600 text-center italic">No transactions yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => {
            const total = transactions
              .filter((t) => t.category === category)
              .reduce((sum, t) => sum + Number(t.amount), 0);

            return (
              <div
                key={category}
                className="p-4 rounded-xl bg-white/80 shadow hover:shadow-2xl transition"
              >
                <h3 className="text-lg font-bold text-indigo-700">{category}</h3>
                <p className="text-gray-800 font-semibold mt-2">${total}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
