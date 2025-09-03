import { Plus } from 'lucide-react';

const Navbar = ({ onAddPatient }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Hospital Reception
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddPatient}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              <span>Add New Patient</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;