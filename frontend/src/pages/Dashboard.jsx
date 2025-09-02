import { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import Filters from '../components/Filters';
import PatientsTable from '../components/PatientsTable';
import DownloadButtons from '../components/DownloadButtons';
import PatientModal from '../components/PatientModal';
import AddPatientModal from '../components/AddPatientModal';
import { getPatients, getPatientById, addPatient, downloadPatients } from '../api/index';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayVisits: 0,
    malePatients: 0,
    femalePatients: 0
  });
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    fromDate: '',
    toDate: ''
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Fetch all patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  
  useEffect(() => {
    calculateStats(patients);
    setFilteredPatients(patients);
  }, [patients]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients();
      // Handle the backend response structure: { success: true, count: 2, data: [...] }
      setPatients(response.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      // You can add toast notification here
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (patientsData) => {
    const today = new Date().toDateString();
    
    const totalPatients = patientsData.length;
    // Updated to use 'Date' field from backend response
    const todayVisits = patientsData.filter(patient => 
      new Date(patient.Date).toDateString() === today
    ).length;
    // Note: Backend doesn't have gender field, so these will be 0
    // You might need to add gender field to your backend or remove these stats
    const malePatients = patientsData.filter(patient => 
      patient.gender?.toLowerCase() === 'male'
    ).length;
    const femalePatients = patientsData.filter(patient => 
      patient.gender?.toLowerCase() === 'female'
    ).length;

    setStats({
      totalPatients,
      todayVisits,
      malePatients,
      femalePatients
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Create filter object with only non-empty values
      const filterParams = {};
      if (filters.name) filterParams.name = filters.name;
      if (filters.gender) filterParams.gender = filters.gender;
      if (filters.fromDate) filterParams.fromDate = filters.fromDate;
      if (filters.toDate) filterParams.toDate = filters.toDate;

      const response = await getPatients(filterParams);
      // Handle the backend response structure
      setFilteredPatients(response.data || []);
    } catch (error) {
      console.error('Error filtering patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPatient = async (patientId) => {
    try {
      const response = await getPatientById(patientId);
      setSelectedPatient(response.data || response.patient);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleAddPatient = async (patientData) => {
    setLoading(true);
    try {
      await addPatient(patientData);
      setShowAddPatient(false);
      // Refresh the patients list
      await fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filtered = false) => {
    setDownloadLoading(true);
    try {
      let filterParams = {};
      
      if (filtered) {
        // Use current filters for filtered download
        if (filters.name) filterParams.name = filters.name;
        if (filters.gender) filterParams.gender = filters.gender;
        if (filters.fromDate) filterParams.fromDate = filters.fromDate;
        if (filters.toDate) filterParams.toDate = filters.toDate;
      }

      const response = await downloadPatients(filterParams);
      
      // Create blob and download
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filtered ? 'filtered_patients.xlsx' : 'all_patients.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading patients:', error);
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddPatient={() => setShowAddPatient(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Today's Visits"
            value={stats.todayVisits}
            icon={UserCheck}
            color="green"
          />
          <StatsCard
            title="Male Patients"
            value={stats.malePatients}
            icon={TrendingUp}
            color="purple"
          />
          <StatsCard
            title="Female Patients"
            value={stats.femalePatients}
            icon={Calendar}
            color="orange"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>

        {/* Patients Table */}
        <div className="mb-8">
          <PatientsTable
            patients={filteredPatients}
            onViewPatient={handleViewPatient}
            loading={loading}
          />
        </div>

        {/* Download Buttons */}
        <div className="mb-8">
          <DownloadButtons
            onDownloadAll={() => handleDownload(false)}
            onDownloadFiltered={() => handleDownload(true)}
            loading={downloadLoading}
          />
        </div>
      </div>

      {/* Modals */}
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showAddPatient && (
        <AddPatientModal
          onClose={() => setShowAddPatient(false)}
          onSave={handleAddPatient}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Dashboard;