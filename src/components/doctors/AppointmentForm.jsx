import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import { toast } from 'react-hot-toast';

const AppointmentForm = () => {
    // eslint-disable-next-line no-unused-vars
    const { doctorId } = useParams();
    const navigate = useNavigate();
    
    // Mock data for doctor availability
    const availabilityTimes = {
        MONDAY: { time: "09:00 AM - 11:00 AM" },
        WEDNESDAY: { time: "02:00 PM - 04:00 PM" },
        FRIDAY: { time: "10:00 AM - 12:00 PM" }
    };
    
    const availableDates = ['2023-12-04', '2023-12-06', '2023-12-08'];
    const availableSlotsPerDate = {
        '2023-12-04': 5,
        '2023-12-06': 3,
        '2023-12-08': 7
    };
    
    // Mock clinics data
    const mockClinics = [
        {
            clinicId: '1',
            name: 'City Health Clinic',
            address: '123 Main St, New Delhi',
            latitude: 28.6139,
            longitude: 77.2090
        },
        {
            clinicId: '2',
            name: 'Metro Medical Center',
            address: '456 Park Ave, Mumbai',
            latitude: 19.0760,
            longitude: 72.8777
        },
        {
            clinicId: '3',
            name: 'Sunshine Healthcare',
            address: '789 Beach Rd, Chennai',
            latitude: 13.0827,
            longitude: 80.2707
        }
    ];

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        prescription: null,
        userLatitude: '',
        userLongitude: '',
        clinicId: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [clinics, setClinics] = useState(mockClinics);
    const [map, setMap] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [routeLayer, setRouteLayer] = useState(null);
    const [locationError, setLocationError] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [customer] = useState({
        customerId: 'cust123',
        name: 'John Doe',
        email: 'john@example.com'
    });

    // Initialize map
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mapInstance = L.map('map').setView([20.5937, 78.9629], 5);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
            setMap(mapInstance);

            return () => {
                mapInstance.remove();
            };
        }
    }, []);

    // Update map when locations change
    useEffect(() => {
        if (!map || !formData.userLatitude || !formData.userLongitude || !formData.clinicId) return;

        const selectedClinic = clinics.find(c => c.clinicId === formData.clinicId);
        if (!selectedClinic) return;

        // Clear previous markers and route
        map.eachLayer(layer => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        // Add markers
        const userIcon = L.icon({
            iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        const clinicIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        const userMarker = L.marker([formData.userLatitude, formData.userLongitude], {icon: userIcon})
            .addTo(map)
            .bindPopup("Your Location");
        
        const clinicMarker = L.marker([selectedClinic.latitude, selectedClinic.longitude], {icon: clinicIcon})
            .addTo(map)
            .bindPopup(selectedClinic.name);

        // Fit bounds to show both locations
        const group = new L.FeatureGroup([userMarker, clinicMarker]);
        map.fitBounds(group.getBounds().pad(0.2));

        // Draw route (simple straight line for demo)
        const route = L.polyline([
            [formData.userLatitude, formData.userLongitude],
            [selectedClinic.latitude, selectedClinic.longitude]
        ], {color: 'blue'}).addTo(map);
        setRouteLayer(route);

    }, [formData.userLatitude, formData.userLongitude, formData.clinicId, clinics, map]);

    const handleLocationRequest = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        userLatitude: position.coords.latitude,
                        userLongitude: position.coords.longitude
                    }));
                    setLocationError(null);
                    toast.success("Location captured successfully!");
                },
                (error) => {
                    setLocationError("Unable to retrieve your location. Please enable location services.");
                    toast.error("Location access denied");
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
        }
    };

    const handleDateSelect = (date) => {
        const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
        const availableTime = availabilityTimes[dayOfWeek]?.time || '';
        
        setFormData(prev => ({
            ...prev,
            date,
            time: availableTime
        }));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'prescription') {
            const file = files[0];
            if (file) {
                const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                const maxSize = 5 * 1024 * 1024;

                if (!validTypes.includes(file.type)) {
                    toast.error('Please upload only images (JPEG, PNG) or PDF files');
                    return;
                }

                if (file.size > maxSize) {
                    toast.error('File size should be less than 5MB');
                    return;
                }

                setFormData(prev => ({ ...prev, prescription: file }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            toast.success('Appointment booked successfully!');
            navigate('/');
            setSubmitting(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center bg-blue-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Appointment</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Appointment Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                        <button
                            type="button"
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {formData.date || 'Choose Date'}
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
                        <div className="w-full px-4 py-2 bg-gray-100 rounded-md">
                            {formData.time || 'Select a date first'}
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={formData.userLatitude}
                                readOnly
                                placeholder="Latitude"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                            <input
                                type="text"
                                value={formData.userLongitude}
                                readOnly
                                placeholder="Longitude"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                            <button
                                type="button"
                                onClick={handleLocationRequest}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md whitespace-nowrap"
                            >
                                Get My Location
                            </button>
                        </div>
                        {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
                    </div>

                    {/* Clinic Selection */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Clinic</label>
                        <select
                            name="clinicId"
                            value={formData.clinicId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select a clinic</option>
                            {clinics.map(clinic => (
                                <option key={clinic.clinicId} value={clinic.clinicId}>
                                    {clinic.name} - {clinic.address}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Map */}
                    <div className="sm:col-span-2 h-64 rounded-lg overflow-hidden border border-gray-300 ">
                        <div id="map" className="w-full h-full"></div>
                    </div>

                    {/* Prescription */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Prescription (Optional)
                        </label>
                        <input
                            type="file"
                            name="prescription"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, JPG, PNG formats only.</p>
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`px-6 py-2 rounded-md text-white ${
                                submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {submitting ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Calendar Popup */}
            {isCalendarOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-5 shadow-lg w-[90%] max-w-[700px] max-h-[90vh] overflow-auto">
                        <h3 className="text-xl font-semibold mb-4">Select Appointment Date</h3>
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-center font-medium py-2">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {availableDates.map(date => {
                                const day = new Date(date).getDate();
                                const slots = availableSlotsPerDate[date] || 0;
                                return (
                                    <button
                                        key={date}
                                        onClick={() => {
                                            handleDateSelect(date);
                                            setIsCalendarOpen(false);
                                        }}
                                        className={`p-2 rounded-full ${formData.date === date ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        {day}
                                        <div className="text-xs">{slots} slots</div>
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setIsCalendarOpen(false)}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentForm;