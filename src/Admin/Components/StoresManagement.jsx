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

const StoresManagement = () => {
    const [stores, setStores] = useState([]);
    const [showAddStoreModal, setShowAddStoreModal] = useState(false);
    const [newStore, setNewStore] = useState({
        name: '',
        phone: '',
        address: '',
        latitude: '',
        longitude: '',
    });
    // eslint-disable-next-line no-unused-vars
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center (London)

    // Load sample data (in a real app, this would come from an API)
    useEffect(() => {
        const sampleStores = [
        { id: 1, name: 'Main Pharmacy', phone: '123-456-7890', address: '123 Health St, Medical City', latitude: '51.505', longitude: '-0.09' },
        { id: 2, name: 'Northside Drugstore', phone: '987-654-3210', address: '456 Wellness Ave, Care Town', latitude: '51.51', longitude: '-0.1' },
        ];
        setStores(sampleStores);
    }, []);

    const handleAddStore = () => {
        if (newStore.name && newStore.phone && newStore.address && newStore.latitude && newStore.longitude) {
        setStores([...stores, { ...newStore, id: stores.length + 1 }]);
        setNewStore({
            name: '',
            phone: '',
            address: '',
            latitude: '',
            longitude: '',
        });
        setShowAddStoreModal(false);
        }
    };

    const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        setNewStore(prev => ({
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
        setNewStore(prev => ({
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

        return newStore.latitude && newStore.longitude ? (
        <Marker position={[parseFloat(newStore.latitude), parseFloat(newStore.longitude)]} />
        ) : null;
    };

    return (
        <div className="w-full p-6 mt-10">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Stores</h1>
            <button
            onClick={() => setShowAddStoreModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
            Add New Store
            </button>
        </div>

        <div className="space-y-4">
            {stores.map(store => (
            <div key={store.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center h-16 border-l-4 border-blue-500">
                <div>
                <h3 className="font-semibold text-gray-800">{store.name}</h3>
                <p className="text-sm text-gray-600">{store.address}</p>
                </div>
                <div className="text-right">
                <p className="text-gray-800">{store.phone}</p>
                <p className="text-xs text-gray-500">Lat: {store.latitude}, Lng: {store.longitude}</p>
                </div>
            </div>
            ))}
        </div>

        {/* Add Store Modal */}
        {showAddStoreModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Add New Store</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                    type="text"
                    value={newStore.name}
                    onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Store name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                    type="text"
                    value={newStore.phone}
                    onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Phone number"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                    type="text"
                    value={newStore.address}
                    onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Address will auto-fill from map"
                    readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                    type="text"
                    value={newStore.latitude}
                    onChange={(e) => setNewStore({...newStore, latitude: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Click on map to set"
                    readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                    type="text"
                    value={newStore.longitude}
                    onChange={(e) => setNewStore({...newStore, longitude: e.target.value})}
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
                    onClick={() => setShowAddStoreModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddStore}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!newStore.name || !newStore.phone || !newStore.address}
                >
                    Add Store
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default StoresManagement;