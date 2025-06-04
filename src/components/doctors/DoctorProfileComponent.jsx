import React from "react";

const DoctorProfileComponent = () => {
    return (
        <div className="max-w-7xl mx-auto rounded-lg shadow-md py-16 px-6 sm:px-12 md:px-20 lg:px-32">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row gap-6">
            {/* Doctor Image */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
                alt="Doctor"
                className="w-full h-full object-cover"
            />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dr. Ronald Richards</h1>
            <p className="text-lg text-blue-600 font-medium mb-4">Immunology Specialist</p>

            </div>
        </div>

        {/* Bio Section */}
        <div className="my-6">
            <p className="text-gray-700 mb-4">
            Auditor cursus at dictum lectura. Sit feugiat tricolauri in tricolouri et voluptat. 
            A sit montes arcu ut dignissim. Magri e nec cursus morbi turpis amet ac magna euismod.
            </p>
            <p className="text-gray-700">
            Egentas in blandit elit vitae. Buva massa, ultricies paum soa est miogile. 
            Suspendisse non rutrum suspendisse munc vel. Ac liusur morbi limpilla massa suspendisse omuro.
            </p>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500 mb-1">Degree</h3>
            <p className="text-gray-800">DO (Doctor of Orthopaedic Medicine)</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500 mb-1">Experience</h3>
            <p className="text-gray-800">8 Years of Experience</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500 mb-1">Available Days</h3>
            <p className="text-gray-800">Tuesday, Thursday, Saturday</p>
            </div>
        </div>

        {/* Appointment Button */}
        <button className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Book Appointment
        </button>
        </div>
    );
};

export default DoctorProfileComponent;