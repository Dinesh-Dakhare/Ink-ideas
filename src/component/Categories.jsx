import React from "react";

const Categories = ({ postStats }) => {
  if (!postStats) return <div>Loading...</div>;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Top Categories
      </h3>
      <div className="space-y-3">
        {postStats?.topCategories &&
          Object.entries(postStats.topCategories).map(
            ([category, count], index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-700 capitalize">{category}</span>
                </div>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Categories;
