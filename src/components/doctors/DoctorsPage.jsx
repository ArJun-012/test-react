// src/pages/DoctorsPage.jsx
const doctors = [
    {
        name: "Ronald Richards",
        specialty: "Allergy & Immunology",
        image: "/src/assets/ronald.jpg"
    },
    {
        name: "Wade Warren",
        specialty: "Infectious Diseases",
        image: "/src/assets/jenny.jpg"
    },
    {
        name: "Jane Cooper",
        specialty: "Gynecology",
        image: "/src/assets/jane.jpg"
    },
    {
        name: "Theresa Webb",
        specialty: "Pediatrics",
        image: "/src/assets/theresa.jpg"
    },
    {
        name: "Leslie Alexander",
        specialty: "Nephrology",
        image: "/src/assets/leslie.jpg"
    },
    {
        name: "Marvin McKinney",
        specialty: "Cardiology Specialist",
        image: "/src/assets/marvin.jpg"
    }
];

const DoctorsPage = () => {
    return (
        <section className="bg-[#f3f9fc] py-16 px-6">
            <div className="max-w-7xl mx-auto lg:flex-row items-center gap-10">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Doctors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {doctors.map((doc, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
                        <img src={doc.image} alt={doc.name} className="w-full h-50 object-cover rounded-md mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                        <p className="text-sm text-gray-500">{doc.specialty}</p>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DoctorsPage;
