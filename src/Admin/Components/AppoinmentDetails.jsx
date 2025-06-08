/* eslint-disable no-unused-vars */
import { useState } from 'react';

const AppointmentDetails = () => {
  // Sample appointment data
    const [appointments, setAppointments] = useState([
        {
        id: 1,
        patient: {
            name: 'John Doe',
            age: 35,
            phone: '+1 (555) 123-4567',
            email: 'john.doe@example.com',
            address: '123 Main St, Anytown, USA',
            medicalHistory: 'Hypertension, Allergic to Penicillin',
        },
        appointment: {
            date: '2023-06-15',
            time: '10:30 AM',
            reason: 'Annual Checkup',
            prescription: 'prescription.pdf',
            status: 'Confirmed',
        },
        doctor: {
            name: 'Dr. Sarah Smith',
            specialization: 'Cardiology',
            clinic: 'City Heart Center',
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            contact: '+1 (555) 987-6543',
        },
        account: {
            registeredOn: '2022-01-15',
            lastVisit: '2023-01-20',
            totalAppointments: 5,
            insurance: 'Blue Cross Blue Shield',
            memberId: 'BCBS123456',
        },
        },
        {
        id: 2,
        patient: {
            name: 'Jane Smith',
            age: 28,
            phone: '+1 (555) 234-5678',
            email: 'jane.smith@example.com',
            address: '456 Oak Ave, Somewhere, USA',
            medicalHistory: 'None',
        },
        appointment: {
            date: '2023-06-16',
            time: '2:15 PM',
            reason: 'Follow-up Visit',
            prescription: 'followup.pdf',
            status: 'Pending',
        },
        doctor: {
            name: 'Dr. Michael Johnson',
            specialization: 'Pediatrics',
            clinic: 'Children\'s Wellness Clinic',
            image: 'https://randomuser.me/api/portraits/men/42.jpg',
            contact: '+1 (555) 876-5432',
        },
        account: {
            registeredOn: '2023-03-10',
            lastVisit: '2023-05-15',
            totalAppointments: 2,
            insurance: 'Aetna',
            memberId: 'AET789012',
        },
        },
    ]);

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    return (
        <div className="w-[80%] mx-auto p-4 mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointment Management</h1>
        
        <div className="space-y-4">
            {appointments.map((appointment) => (
            <div 
                key={appointment.id}
                onClick={() => handleCardClick(appointment)}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg border-l-4 border-blue-500"
            >
                <div className="flex flex-wrap justify-between items-center">
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    <h3 className="font-semibold text-lg text-gray-800">{appointment.patient.name}</h3>
                    <p className="text-gray-600">{appointment.patient.age} years</p>
                </div>
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    <p className="text-gray-700">{appointment.appointment.date}</p>
                    <p className="text-gray-600">{appointment.appointment.time}</p>
                </div>
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    <p className="text-gray-700">{appointment.doctor.name}</p>
                    <p className="text-gray-600 text-sm">{appointment.doctor.specialization}</p>
                </div>
                <div className="w-full md:w-1/4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                    appointment.appointment.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {appointment.appointment.status}
                    </span>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedAppointment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
                    <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Patient Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Patient Information</h3>
                    <div className="space-y-3">
                        <p><span className="font-medium">Name:</span> {selectedAppointment.patient.name}</p>
                        <p><span className="font-medium">Age:</span> {selectedAppointment.patient.age}</p>
                        <p><span className="font-medium">Phone:</span> {selectedAppointment.patient.phone}</p>
                        <p><span className="font-medium">Email:</span> {selectedAppointment.patient.email}</p>
                        <p><span className="font-medium">Address:</span> {selectedAppointment.patient.address}</p>
                        <p><span className="font-medium">Medical History:</span> {selectedAppointment.patient.medicalHistory}</p>
                    </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Doctor Information</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                        <img 
                            src={selectedAppointment.doctor.image} 
                            alt={selectedAppointment.doctor.name}
                            className="w-full h-full object-cover"
                        />
                        </div>
                        <div className="flex-1 space-y-3">
                        <p><span className="font-medium">Name:</span> {selectedAppointment.doctor.name}</p>
                        <p><span className="font-medium">Specialization:</span> {selectedAppointment.doctor.specialization}</p>
                        <p><span className="font-medium">Clinic:</span> {selectedAppointment.doctor.clinic}</p>
                        <p><span className="font-medium">Contact:</span> {selectedAppointment.doctor.contact}</p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Appointment Details */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Appointment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p><span className="font-medium">Date:</span> {selectedAppointment.appointment.date}</p>
                        <p><span className="font-medium">Time:</span> {selectedAppointment.appointment.time}</p>
                        <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            selectedAppointment.appointment.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {selectedAppointment.appointment.status}
                        </span>
                        </p>
                    </div>
                    <div>
                        <p><span className="font-medium">Reason:</span> {selectedAppointment.appointment.reason}</p>
                        <p><span className="font-medium">Prescription:</span> 
                        <a 
                            href={selectedAppointment.appointment.prescription} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline ml-2"
                        >
                            View File
                        </a>
                        </p>
                    </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p><span className="font-medium">Registered On:</span> {selectedAppointment.account.registeredOn}</p>
                        <p><span className="font-medium">Last Visit:</span> {selectedAppointment.account.lastVisit}</p>
                    </div>
                    <div>
                        <p><span className="font-medium">Total Appointments:</span> {selectedAppointment.account.totalAppointments}</p>
                        <p><span className="font-medium">Insurance:</span> {selectedAppointment.account.insurance} ({selectedAppointment.account.memberId})</p>
                    </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    Reschedule
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Confirm Appointment
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default AppointmentDetails;