import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // لتحسين اختيار الفئات
import Slider from "rc-slider"; // لتحديد الأسعار
import "rc-slider/assets/index.css"; // استيراد الأنماط
import debounce from "lodash/debounce"; // لتطبيق الفلاتر أثناء الكتابة مباشرة

const CoursesPage = () => {
  const [courses, setCourses] = useState([]); // قائمة الكورسات المعروضة
  const [allCourses, setAllCourses] = useState([]); // جميع الكورسات
  const [filters, setFilters] = useState({
    title: "",
    categorys: [],
    minPrice: 0,
    maxPrice: 1000,
  });
  const [categories, setCategories] = useState([]); // قائمة الفئات
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [message, setMessage] = useState(""); // الرسائل للمستخدم
  const [isInitialLoad, setIsInitialLoad] = useState(true); // لتجنب الفلاتر أثناء التحميل الأول

  // Fetch categories and all courses on page load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all categories
        const categoriesResponse = await axios.get("https://bsesa-backend.onrender.com/categories");
        const categoryOptions = categoriesResponse.data.categorys.map((category) => ({
          value: category._id,
          label: category.name,
        }));
        setCategories(categoryOptions);

        // Fetch all courses
        const coursesResponse = await axios.get("https://bsesa-backend.onrender.com/courses");
        setCourses(coursesResponse.data); // عرض جميع الكورسات
        setAllCourses(coursesResponse.data); // الاحتفاظ بالكورسات الكاملة
        setMessage("");
        setIsInitialLoad(false); // تعيين التحميل الأول كمنتهي
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  const applyFilters = () => {
    if (isInitialLoad) return; // تخطي الفلاتر أثناء التحميل الأول

    let filteredCourses = allCourses;

    // Filter by title
    if (filters.title) {
      const titleRegex = new RegExp(filters.title, "i");
      filteredCourses = filteredCourses.filter((course) => titleRegex.test(course.title));
    }

    // Filter by categories
    if (filters.categorys.length > 0) {
      const selectedCategoryIds = filters.categorys.map((category) => category.value);
      filteredCourses = filteredCourses.filter((course) =>
        course.categorys.some((categoryId) => selectedCategoryIds.includes(categoryId))
      );
    }

    // Filter by price range
    filteredCourses = filteredCourses.filter(
      (course) => course.price >= filters.minPrice && course.price <= filters.maxPrice
    );

    setCourses(filteredCourses);
  };

  // Debounced filter application for title search
  const debouncedApplyFilters = debounce(applyFilters, 300);

  // Apply filters when filters state changes
  useEffect(() => {
    debouncedApplyFilters();
    return debouncedApplyFilters.cancel; // Cleanup
  }, [filters]);

  // Handle title search
  const handleTitleChange = (e) => {
    setFilters((prev) => ({ ...prev, title: e.target.value }));
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategories) => {
    setFilters((prev) => ({ ...prev, categorys: selectedCategories || [] }));
  };

  // Handle price range
  const handlePriceChange = ([min, max]) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      {/* Filters Section */}
      <div className="filters space-y-4 mb-6">
        {/* Title Search */}
        <div>
          <label className="block text-lg mb-2">Search by Title</label>
          <input
            type="text"
            placeholder="Type to search..."
            value={filters.title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-lg mb-2">Filter by Categories</label>
          <Select
            options={categories}
            isMulti
            value={filters.categorys}
            onChange={handleCategoryChange}
            className="text-gray-900"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-lg mb-2">Price Range</label>
          <Slider
            range // تفعيل النطاق
            min={0}
            max={1000}
            step={10}
            value={[filters.minPrice, filters.maxPrice]} // قيم النطاق
            onChange={(values) => handlePriceChange(values)} // تحديث القيم
            trackStyle={[{ backgroundColor: "#facc15" }]} // شريط النطاق
            handleStyle={[
              { backgroundColor: "#facc15", borderColor: "#facc15" },
              { backgroundColor: "#facc15", borderColor: "#facc15" },
            ]}
            railStyle={{ backgroundColor: "#1f2937" }} // الشريط السفلي
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses">
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-gray-800 p-4 rounded">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-400 mb-2">{course.description}</p>
                <p className="text-yellow-500 font-bold">${course.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{message || "No courses found."}</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
