import React from "react";

const ProductDetails = () => {
    return (
        <div className="w-full h-auto flex items-center justify-center mt-24">
        <section className="max-w-[90%] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="grid grid-cols-2 gap-4">
            <img
            src="/src/assets/product1.jpg"
            alt="Optigut Bottle"
            className="w-full h-auto rounded-xl object-cover"
            />
            <img
            src="/src/assets/product1-1.jpg"
            alt="Capsules"
            className="w-full h-auto rounded-xl object-cover"
            />
        </div>

        {/* Product Info */}
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Optigut probiotic blend tablets
            </h1>
            <p className="text-xl font-semibold text-green-800 mb-2">$39.00 USD</p>
            <p className="text-gray-600 mb-4">
            These tablets are formulated with a powerful blend of probiotics to support digestion and promote overall well-being.
            </p>

            {/* Bottle Quantity */}
            <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mr-2">Bottle:</label>
            <select className="border border-gray-300 rounded px-3 py-1">
                <option>5</option>
                <option>10</option>
                <option>15</option>
            </select>
            </div>

            {/* Ingredients and Features */}
            <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <h3 className="font-semibold text-gray-700 mb-1">Ingredients:</h3>
                <ul className="list-disc ml-4 text-gray-600 space-y-1">
                <li>Probiotic blend</li>
                <li>Palatable fiber</li>
                <li>Digestive enzymes</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-gray-700 mb-1">Key features:</h3>
                <ul className="list-disc ml-4 text-gray-600 space-y-1">
                <li>Supports gut health</li>
                <li>Balances digestive flora</li>
                <li>Enhances nutrient absorption</li>
                </ul>
            </div>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-2 rounded">
            Add to Cart
            </button>
        </div>
        </section>
        </div>
    );
};

export default ProductDetails;
