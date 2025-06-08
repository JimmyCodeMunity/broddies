import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { CartContext } from "../context/CartContext";

const ArtDetails = ({ prod }) => {
    const { categories } = useContext(ApiContext);
    const { addToCart } = useContext(CartContext);
    console.log("cat",categories)
    console.log("prodcat",prod.category)

    return (
        <div className="bg-white w-full">
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <nav className="flex">
                        <ol role="list" className="flex items-center">
                            <li className="text-left">
                                <div className="-m-1">
                                    <a
                                        href="/"
                                        className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                    >
                                        {" "}
                                        Art{" "}
                                    </a>
                                </div>
                            </li>

                            <li className="text-left">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <div className="-m-1">
                                        <a
                                            href="/view-all-art"
                                            className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                        >
                                            {" "}
                                            View{" "}
                                        </a>
                                    </div>
                                </div>
                            </li>

                            <li className="text-left">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <div className="-m-1">
                                        <a
                                            href="#"
                                            className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                            aria-current="page"
                                        >
                                            {" "}
                                            {prod?.artname}{" "}
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
                        <div className="lg:col-span-1">
                            <div className="relative mt-10 w-full">
                                <img
                                    src={`https://broddie.menthealventures.com/${prod?.image}`}
                                    alt={prod?.artname}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                            </div>
                        </div>

                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                {prod?.artname}
                            </h1>

                            {/* Category Badge */}
                            <div className="mt-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                    {categories.find(cat => cat._id === prod?.category)?.categoryname || 'Art'}
                                </span>
                            </div>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">
                                    ${prod?.price}
                                </p>
                            </div>

                            {/* Description Section */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                                <div className="mt-4 bg-gray-50 rounded-lg p-6 border border-gray-100">
                                    <p className="text-base text-gray-700 leading-relaxed">
                                        {prod?.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-32">Category:</span>
                                        <span className="text-gray-900 font-medium">
                                            {categories.find(cat => cat._id === prod?.category)?.categoryname || 'Art'}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-32">Artist:</span>
                                        <span className="text-gray-900 font-medium">{prod?.artist || 'Anonymous'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-32">Medium:</span>
                                        <span className="text-gray-900 font-medium">{prod?.medium || 'Mixed Media'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className="text-3xl font-bold">${prod?.price}</h1>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addToCart(prod)}
                                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="shrink-0 mr-3 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArtDetails;
