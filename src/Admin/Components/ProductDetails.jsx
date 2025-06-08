import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

const ProductDetails = () => {
    // Sample product data
    const [products, setProducts] = useState([
        {
        id: 1,
        name: "Paracetamol 500mg",
        images: [
            "https://m.media-amazon.com/images/I/61tP6W5YfFL._SL1500_.jpg",
            "https://5.imimg.com/data5/SELLER/Default/2021/12/QT/VO/KY/3033203/paracetamol-tablet-500mg.jpg"
        ],
        stock: 150,
        quantityPerUnit: "10 tablets",
        category: "Medicines",
        price: 2.99,
        requiresPrescription: false
        },
        {
        id: 2,
        name: "Vitamin D3 1000IU",
        images: [
            "https://m.media-amazon.com/images/I/71YHjVXyR0L._SL1500_.jpg",
            ""
        ],
        stock: 85,
        quantityPerUnit: "60 capsules",
        category: "Supplements",
        price: 9.99,
        requiresPrescription: false
        },
        {
        id: 3,
        name: "Blood Pressure Monitor",
        images: [
            "https://m.media-amazon.com/images/I/71ZRTk0-d2L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71xV9o6vJFL._SL1500_.jpg"
        ],
        stock: 23,
        quantityPerUnit: "1 device",
        category: "Medical Devices",
        price: 39.99,
        requiresPrescription: true
        }
    ]);

    // State for modal and form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        images: ["", ""],
        stock: 0,
        quantityPerUnit: "",
        category: "",
        price: 0,
        requiresPrescription: false
    });

    // Categories
    const categories = [
        "Medicines",
        "Supplements",
        "Medical Devices",
        "Personal Care",
        "Health Foods",
        "Others"
    ];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
        ...newProduct,
        [name]: value
        });
    };

    // Handle number input changes
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
        ...newProduct,
        [name]: parseFloat(value) || 0
        });
    };

    // Handle image upload
    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedImages = [...newProduct.images];
            updatedImages[index] = reader.result;
            setNewProduct({
            ...newProduct,
            images: updatedImages
            });
        };
        reader.readAsDataURL(file);
        }
    };

    // Handle prescription requirement change
    const handlePrescriptionChange = (value) => {
        setNewProduct({
        ...newProduct,
        requiresPrescription: value === "yes"
        });
    };

    // Add new product
    const addProduct = () => {
        if (
        !newProduct.name ||
        !newProduct.category ||
        newProduct.price <= 0 ||
        newProduct.stock < 0 ||
        !newProduct.images[0]
        ) {
        alert("Please fill all required fields with valid values");
        return;
        }

        const productToAdd = {
        id: products.length + 1,
        ...newProduct
        };

        setProducts([...products, productToAdd]);
        
        // Reset form
        setNewProduct({
        name: "",
        images: ["", ""],
        stock: 0,
        quantityPerUnit: "",
        category: "",
        price: 0,
        requiresPrescription: false
        });
        setIsModalOpen(false);
    };

    // Delete product
    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="w-full p-6 mt-10">
        {/* Header with Add Product button */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
            <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
            <Plus size={18} />
            Add Product
            </button>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
            <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
                {/* Product Images */}
                <div className="h-48 bg-gray-100 relative">
                {product.images[0] ? (
                    <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                    </div>
                )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                    </span>
                </div>

                <div className="mt-2 space-y-1">
                    <p className="text-gray-600">
                    <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                    <span className="font-medium">Stock:</span> {product.stock}
                    </p>
                    {product.quantityPerUnit && (
                    <p className="text-gray-600">
                        <span className="font-medium">Qty/Unit:</span> {product.quantityPerUnit}
                    </p>
                    )}
                    <p className="text-gray-600">
                    <span className="font-medium">Prescription:</span>{" "}
                    {product.requiresPrescription ? (
                        <span className="text-red-500">Required</span>
                    ) : (
                        <span className="text-green-500">Not Required</span>
                    )}
                    </p>
                </div>

                {/* Delete Button */}
                <div className="mt-4 flex justify-end">
                    <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                    aria-label={`Delete ${product.name}`}
                    >
                    <Trash2 size={20} />
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* Add Product Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Product</h2>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    {/* Name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product Name"
                        required
                    />
                    </div>

                    {/* Image Uploads */}
                    <div className="space-y-4">
                    {[0, 1].map((index) => (
                        <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {index === 0 ? "Primary Image *" : "Secondary Image"}
                        </label>
                        <div className="flex items-center">
                            <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden mr-4">
                            {newProduct.images[index] ? (
                                <img
                                src={newProduct.images[index]}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No image
                                </div>
                            )}
                            </div>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, index)}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Category */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                    </label>
                    <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {/* Price */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($) *
                    </label>
                    <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={handleNumberChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                        required
                    />
                    </div>

                    {/* Stock */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity *
                    </label>
                    <input
                        type="number"
                        name="stock"
                        min="0"
                        value={newProduct.stock}
                        onChange={handleNumberChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                        required
                    />
                    </div>

                    {/* Quantity per Unit */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity in 1 Unit
                    </label>
                    <input
                        type="text"
                        name="quantityPerUnit"
                        value={newProduct.quantityPerUnit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 10 tablets, 100ml"
                    />
                    </div>

                    {/* Prescription Required */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prescription Required *
                    </label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="requiresPrescription"
                            value="yes"
                            checked={newProduct.requiresPrescription === true}
                            onChange={() => handlePrescriptionChange("yes")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="requiresPrescription"
                            value="no"
                            checked={newProduct.requiresPrescription === false}
                            onChange={() => handlePrescriptionChange("no")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                        </label>
                    </div>
                    </div>
                </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={addProduct}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Save Product
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default ProductDetails;