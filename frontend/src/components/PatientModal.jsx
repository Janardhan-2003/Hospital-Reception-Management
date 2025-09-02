import { X, User, Phone, Calendar, MapPin, FileText, Hash, UserCheck } from 'lucide-react';

const PatientModal = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Basic Information</h3>
              
              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date</label>
                  <p className="text-gray-900 font-medium">
                    {patient.Date ? new Date(patient.Date).toLocaleDateString() : '-'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Hash className="text-blue-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">IP No</label>
                  <p className="text-gray-900 font-medium">{patient["IP No"] || '-'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="text-blue-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">S.No</label>
                  <p className="text-gray-900">{patient["S.No"] || '-'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="text-blue-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900 font-medium">{patient.Name || '-'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">Age</label>
                  <p className="text-gray-900">{patient.Age ? `${patient.Age} years old` : '-'}</p>
                </div>
              </div>
            </div>

            {/* Contact & Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Contact & Additional Information</h3>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-green-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{patient.Phone || '-'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="text-green-600" size={20} />
                <div>
                  <label className="block text-sm font-medium text-gray-600">Place</label>
                  <p className="text-gray-900">{patient.Place || '-'}</p>
                </div>
              </div>

              {patient.referralName && (
                <div className="flex items-center space-x-3">
                  <UserCheck className="text-green-600" size={20} />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Referral Name</label>
                    <p className="text-gray-900">{patient["Referral Name"]}</p>
                  </div>
                </div>
              )}

              {patient.referralPhone && (
                <div className="flex items-center space-x-3">
                  <Phone className="text-green-600" size={20} />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Referral Phone</label>
                    <p className="text-gray-900">{patient["Referral Phone"]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Patient Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-600">IP No</span>
                <span className="text-lg font-mono font-bold text-blue-600">{patient['IP No'] || '-'}</span>
              </div>
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-600">S.No</span>
                <span className="text-lg font-mono font-bold text-green-600">{patient["S.No"] || '-'}</span>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <span className="block text-sm font-medium text-gray-600">Date</span>
                <span className="text-lg font-semibold text-purple-600">
                  {patient.Date ? new Date(patient.Date).toLocaleDateString() : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;