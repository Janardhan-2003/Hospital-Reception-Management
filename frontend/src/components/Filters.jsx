import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

const Filters = ({ filters, onFiltersChange, onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState({
    date: filters.date || "",
    ipNo: filters.ipNo || "",
    sNo: filters.sNo || "",
    age: filters.age || "",
    referralName: filters.referralName || "",
  });

  const handleInputChange = (field, value) => {
    console.log(`Filter changed: ${field} = ${value}`);
    const newFilters = {
      ...filters,
      [field]: value,
    };
    console.log("All filters:", newFilters);
    onFiltersChange(newFilters);
  };

  const handleModalFilterChange = (field, value) => {
    setModalFilters({
      ...modalFilters,
      [field]: value,
    });
  };

  const applyModalFilters = () => {
    onFiltersChange({
      ...filters,
      ...modalFilters,
    });
    setIsModalOpen(false);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      name: "",
      place: "",
      date: "",
      ipNo: "",
      sNo: "",
      age: "",
      referralName: "",
    };
    setModalFilters({
      date: "",
      ipNo: "",
      sNo: "",
      age: "",
      referralName: "",
    });
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Search & Filter
        </h2>

        {/* Main Search Section */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Name Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Name
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Enter patient name..."
                value={filters.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Place Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Place
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Enter place..."
                value={filters.place || ""}
                onChange={(e) => handleInputChange("place", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-gray-300 cursor-pointer"
            >
              <Filter size={18} />
              <span>More Filters</span>
            </button>

            <button
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <button
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            <Search size={18} />
            <span>Search Results</span>
          </button>
        </div>
      </div>

      {/* Modal for Additional Filters */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Additional Filters
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={modalFilters.date}
                    onChange={(e) =>
                      handleModalFilterChange("date", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* IP No Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter IP number..."
                    value={modalFilters.ipNo}
                    onChange={(e) =>
                      handleModalFilterChange("ipNo", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* S.No Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    S.No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter serial number..."
                    value={modalFilters.sNo}
                    onChange={(e) =>
                      handleModalFilterChange("sNo", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Age Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter age..."
                    value={modalFilters.age}
                    onChange={(e) =>
                      handleModalFilterChange("age", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Referral Name Filter */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Referral Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter referral name..."
                    value={modalFilters.referralName}
                    onChange={(e) =>
                      handleModalFilterChange("referralName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={applyModalFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
