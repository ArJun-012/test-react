import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ClinicManagement = () => {
    const [clinics, setClinics] = useState([]);
    const [showAddClinicModal, setShowAddClinicModal] = useState(false);
    const [newClinic, setNewClinic] = useState({
        name: '',
        phone: '',
        address: '',
        latitude: '',
        longitude: '',
        doctorName: '',
        specialization: '',
        openingHours: '',
    });
    // eslint-disable-next-line no-unused-vars
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center (London)

    // Load sample data
    useEffect(() => {
        const sampleClinics = [
        { 
            id: 1, 
            name: 'City Health Clinic', 
            phone: '123-456-7890', 
            address: '123 Medical Plaza, Health City', 
            latitude: '51.505', 
            longitude: '-0.09',
            doctorName: 'Dr. Sarah Johnson',
            specialization: 'General Medicine',
            openingHours: 'Mon-Fri: 8am-6pm'
        },
        { 
            id: 2, 
            name: 'Northside Medical Center', 
            phone: '987-654-3210', 
            address: '456 Wellness Blvd, Care Town', 
            latitude: '51.51', 
            longitude: '-0.1',
            doctorName: 'Dr. Michael Chen',
            specialization: 'Pediatrics',
            openingHours: 'Mon-Sat: 9am-7pm'
        },
        ];
        setClinics(sampleClinics);
    }, []);

    const handleAddClinic = () => {
        if (newClinic.name && newClinic.phone && newClinic.address && newClinic.latitude && newClinic.longitude) {
        setClinics([...clinics, { ...newClinic, id: clinics.length + 1 }]);
        setNewClinic({
            name: '',
            phone: '',
            address: '',
            latitude: '',
            longitude: '',
            doctorName: '',
            specialization: '',
            openingHours: '',
        });
        setShowAddClinicModal(false);
        }
    };

    const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        setNewClinic(prev => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
        }));
        
        try {
        // Reverse geocoding to get human-readable address
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name || 'Address not found';
        setNewClinic(prev => ({
            ...prev,
            address,
        }));
        } catch (error) {
        console.error('Error fetching address:', error);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
        click: handleMapClick,
        });

        return newClinic.latitude && newClinic.longitude ? (
        <Marker position={[parseFloat(newClinic.latitude), parseFloat(newClinic.longitude)]} />
        ) : null;
    };

    return (
        <div className="w-full p-6 mt-10">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Clinics</h1>
            <button
            onClick={() => setShowAddClinicModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
            Add New Clinic
            </button>
        </div>

        <div className="space-y-4">
            {clinics.map(clinic => (
            <div key={clinic.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center h-16 border-l-4 border-green-500">
                <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
                <p className="text-sm text-gray-600">{clinic.address}</p>
                </div>
                <div className="text-right">
                <p className="text-gray-800">{clinic.phone}</p>
                <p className="text-xs text-gray-500">Lat: {clinic.latitude}, Lng: {clinic.longitude}</p>
                </div>
            </div>
            ))}
        </div>

        {/* Add Clinic Modal */}
        {showAddClinicModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Add New Clinic</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                    <input
                    type="text"
                    value={newClinic.name}
                    onChange={(e) => setNewClinic({...newClinic, name: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Clinic name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                    type="text"
                    value={newClinic.phone}
                    onChange={(e) => setNewClinic({...newClinic, phone: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Phone number"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                    type="text"
                    value={newClinic.address}
                    onChange={(e) => setNewClinic({...newClinic, address: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Address will auto-fill from map"
                    readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                    type="text"
                    value={newClinic.latitude}
                    onChange={(e) => setNewClinic({...newClinic, latitude: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Click on map to set"
                    readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                    type="text"
                    value={newClinic.longitude}
                    onChange={(e) => setNewClinic({...newClinic, longitude: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Click on map to set"
                    readOnly
                    />
                </div>
                </div>

                <div className="h-64 mb-4 rounded-md overflow-hidden">
                <MapContainer 
                    center={mapCenter} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                </MapContainer>
                </div>

                <div className="flex justify-end space-x-3">
                <button
                    onClick={() => setShowAddClinicModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddClinic}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!newClinic.name || !newClinic.phone || !newClinic.address}
                >
                    Add Clinic
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default ClinicManagement;