import { Download, Filter } from 'lucide-react';

const DownloadButtons = ({ onDownloadAll, onDownloadFiltered, loading }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={onDownloadAll}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
      >
        <Download size={20} />
        <span>Download All Data</span>
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>}
      </button>
      
      <button
        onClick={onDownloadFiltered}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
      >
        <Filter size={20} />
        <span>Download Filtered Data</span>
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>}
      </button>
    </div>
  );
};

export default DownloadButtons;