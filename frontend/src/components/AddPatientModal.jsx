import { useState } from 'react';
import { X, Save } from 'lucide-react';

const AddPatientModal = ({ onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    "Date": new Date().toISOString().split('T')[0],
    "IP No": '',
    "S.No": '',
    "Name": '',
    "Age": '',
    "Phone": '',
    "Place": '',
    "Referral Name": '',
    "Referral Phone": ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData["Date"]) {
      newErrors["Date"] = 'Date is required';
    }

    if (!formData["IP No"].trim()) {
      newErrors["IP No"] = 'IP No is required';
    }

    if (!formData["S.No"].trim()) {
      newErrors["S.No"] = 'S.No is required';
    }

    if (!formData["Name"].trim()) {
      newErrors["Name"] = 'Name is required';
    }

    if (!formData["Age"] || formData["Age"] < 1 || formData["Age"] > 150) {
      newErrors["Age"] = 'Please enter a valid age (1-150)';
    }

    if (!formData["Place"].trim()) {
      newErrors["Place"] = 'Place is required';
    }

    // Phone is now optional - only validate if provided
    if (formData["Phone"] && formData["Phone"].trim() && !/^\d{10}$/.test(formData["Phone"].replace(/\D/g, ''))) {
      newErrors["Phone"] = 'Please enter a valid 10-digit phone number';
    }

    // Referral Phone is optional - only validate if provided
    if (formData["Referral Phone"] && formData["Referral Phone"].trim() && !/^\d{10}$/.test(formData["Referral Phone"].replace(/\D/g, ''))) {
      newErrors["Referral Phone"] = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Patient</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData["Date"]}
                onChange={(e) => handleInputChange('Date', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["Date"] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors["Date"] && <p className="mt-1 text-sm text-red-600">{errors["Date"]}</p>}
            </div>

            {/* IP No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IP No *
              </label>
              <input
                type="text"
                value={formData["IP No"]}
                onChange={(e) => handleInputChange('IP No', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["IP No"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter IP number"
              />
              {errors["IP No"] && <p className="mt-1 text-sm text-red-600">{errors["IP No"]}</p>}
            </div>

            {/* S.No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                S.No *
              </label>
              <input
                type="text"
                value={formData["S.No"]}
                onChange={(e) => handleInputChange('S.No', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["S.No"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter serial number"
              />
              {errors["S.No"] && <p className="mt-1 text-sm text-red-600">{errors["S.No"]}</p>}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData["Name"]}
                onChange={(e) => handleInputChange('Name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["Name"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient name"
              />
              {errors["Name"] && <p className="mt-1 text-sm text-red-600">{errors["Name"]}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                value={formData["Age"]}
                onChange={(e) => handleInputChange('Age', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["Age"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter age"
                min="1"
                max="150"
              />
              {errors["Age"] && <p className="mt-1 text-sm text-red-600">{errors["Age"]}</p>}
            </div>

            {/* Phone - NOW OPTIONAL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <input
                type="tel"
                value={formData["Phone"]}
                onChange={(e) => handleInputChange('Phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["Phone"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number (optional)"
              />
              {errors["Phone"] && <p className="mt-1 text-sm text-red-600">{errors["Phone"]}</p>}
            </div>

            {/* Place - NOW REQUIRED */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Place *
              </label>
              <input
                type="text"
                value={formData["Place"]}
                onChange={(e) => handleInputChange('Place', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["Place"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter place"
              />
              {errors["Place"] && <p className="mt-1 text-sm text-red-600">{errors["Place"]}</p>}
            </div>

            {/* Referral Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Name <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData["Referral Name"]}
                onChange={(e) => handleInputChange('Referral Name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter referral name (optional)"
              />
            </div>

            {/* Referral Phone */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Phone <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <input
                type="tel"
                value={formData["Referral Phone"]}
                onChange={(e) => handleInputChange('Referral Phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors["Referral Phone"] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter referral phone number (optional)"
              />
              {errors["Referral Phone"] && <p className="mt-1 text-sm text-red-600">{errors["Referral Phone"]}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Save size={18} />
              <span>Save Patient</span>
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;