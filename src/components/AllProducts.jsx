import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import ProductCard2 from "./cards/ProductCard2";
import { Slider } from "./ui/Slider";
import { format, parseISO } from "date-fns";
import { Filter, X } from "lucide-react";

const AllProducts = () => {
  const { arts, categories } = useContext(ApiContext);
  const [filteredArts, setFilteredArts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (arts) {
      let filtered = [...arts];
      console.log("All arts:", arts);
      console.log("Selected category:", selectedCategory);

      // Filter by category
      if (selectedCategory !== "all") {
        const selectedCategoryName = categories.find(
          (cat) => cat._id === selectedCategory
        )?.categoryname;
        console.log("Selected category name:", selectedCategoryName);

        filtered = filtered.filter((art) => {
          console.log("Art category:", art.category);
          return art.category === selectedCategoryName;
        });
      }

      // Filter by price range
      filtered = filtered.filter(
        (art) => art.price >= priceRange[0] && art.price <= priceRange[1]
      );

      // Sort by date
      filtered.sort((a, b) => {
        const dateA = parseISO(a.createdAt);
        const dateB = parseISO(b.createdAt);
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });

      console.log("Filtered arts:", filtered);
      setFilteredArts(filtered);
    }
  }, [arts, selectedCategory, priceRange, sortBy, categories]);

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryname}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          value={priceRange}
          onChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
          className="w-full"
        />
      </div>

      {/* Sort By Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By Date
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-white overflow-hidden rounded-2xl">
      <section className="py-24">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Section */}
            <div className="w-full lg:w-1/4">
              {/* Desktop Filters */}
              <div className="hidden md:block bg-gray-50 p-6 rounded-xl shadow-sm sticky top-4">
                <FilterSection />
              </div>

              {/* Mobile Filters */}
              {isFilterOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-white">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">Filters</h2>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <FilterSection />
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredArts?.map((prod) => (
                  <div key={prod._id} className="relative">
                    <ProductCard2 prod={prod} />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                      {format(parseISO(prod.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredArts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    No products found
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
