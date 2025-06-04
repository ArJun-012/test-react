import { useState, useEffect } from 'react';
import AddressMap from './map';

export default function UserDashboard() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        address: '',
        location: null,
    });

    const [addressSearch, setAddressSearch] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
        
        // Track address changes separately for the search
        if (name === 'address') {
        setAddressSearch(value);
        }
    };

    const handleLocationSelect = (location) => {
        setFormData(prev => ({
        ...prev,
        location,
        }));
    };

    const handleAddressUpdate = (address) => {
        setFormData(prev => ({
        ...prev,
        address,
        }));
        setAddressSearch(address);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Other form fields remain the same */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="John Doe"
                    required
                />
                </div>

                <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="25"
                    min="1"
                    max="120"
                    required
                />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="john@example.com"
                    required
                />
                </div>

                <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="+1 (555) 123-4567"
                    required
                />
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Full Address
                </label>
                <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                placeholder="Enter address or click on map"
                required
                />
                <p className="mt-1 text-xs text-gray-500">
                Start typing an address and the map will try to locate it (at least country level)
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Interactive Map
                </label>
                <AddressMap 
                onLocationSelect={handleLocationSelect} 
                setAddress={handleAddressUpdate}
                address={addressSearch}
                initialPosition={formData.location}
                />
                {formData.location && (
                <p className="mt-2 text-sm text-gray-600">
                    Coordinates: Latitude {formData.location.lat.toFixed(4)}, Longitude {formData.location.lng.toFixed(4)}
                </p>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <button
                type="button"
                onClick={() => {
                    setFormData({
                    name: '',
                    age: '',
                    email: '',
                    phone: '',
                    address: '',
                    location: null,
                    });
                    setAddressSearch('');
                }}
                className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                Reset Form
                </button>
                <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Save Profile
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}