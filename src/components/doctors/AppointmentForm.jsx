import React, { useState } from 'react';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: '',
        date: '',
        time: '',
        prescription: null,
    });

    const availableDates = ['2025-05-25', '2025-05-26', '2025-05-27'];
    const availableTimes = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'prescription') {
        setFormData({ ...formData, prescription: files[0] });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center  px-4 py-10 sm:px-6 lg:px-8 sm:mb-0 mb-40">
            <img src="/src/assets/appointment.jpg" alt="" className='max-w-7xl rounded-xl w-full object-cover"'/>
            <div className="absolute top-[250px] max-w-4xl w-full bg-white rounded-xl shadow-md shadow-gray-300 p-6 sm:p-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Appointment Now</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="px-2 block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="px-3 py-2 mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="px-2 block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="px-3 py-2 mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="px-2 block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="xyz@example.com"
                    className="px-3 py-2 mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="px-2 block text-sm font-medium text-gray-700">Preferred Date</label>
                    <select
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="px-3 py-2 mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    >
                    <option value="">Select a date</option>
                    {availableDates.map((date) => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="px-2 block text-sm font-medium text-gray-700">Preferred Time</label>
                    <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="px-3 py-2 mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="px-2 block text-sm font-medium text-gray-700">Upload Prescription (PDF/Image)</label>
                    <input
                    type="file"
                    name="prescription"
                    accept="application/pdf,image/*"
                    onChange={handleChange}
                    required
                    className="px-3 py-1 mt-1 block w-full text-sm border-2 border-gray-300 rounded-md text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="px-2 block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type message here..."
                    rows={4}
                    className="px-3 py-2 mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div className="sm:col-span-2 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Monday to Saturday: 09AM - 10PM</p>
                    <button
                    type="submit"
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                    Book Appointment
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;