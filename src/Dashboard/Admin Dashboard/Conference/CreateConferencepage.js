import React, { useState } from "react";
import axios from "axios";

const NewConference = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    categories: "",
    speakers: [],
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // تحديث الحقول الرئيسية
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // تحديث صورة المؤتمر
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // تحديث بيانات المتحدثين
  const handleSpeakerChange = (index, field, value) => {
    const updatedSpeakers = [...formData.speakers];
    if (!updatedSpeakers[index]) {
      updatedSpeakers[index] = { firstName: "", lastName: "", imageUrl: "" };
    }
    updatedSpeakers[index][field] = value;
    setFormData({ ...formData, speakers: updatedSpeakers });
  };

  // إرسال البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("location", formData.location);
    formDataObj.append("description", formData.description);
    formDataObj.append("date[start]", formData.startDate);
    formDataObj.append("date[end]", formData.endDate);
    formDataObj.append("categories", formData.categories.split(","));
    formDataObj.append("speakers", JSON.stringify(formData.speakers)); // تحويل المتحدثين إلى JSON
    formDataObj.append("file", file);

    try {
      const response = await axios.post("https://bsesa-backend.onrender.com/conference/create", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.err || "Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Conference</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Categories</label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="Comma-separated"
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">Speakers</h3>
            {formData.speakers.map((speaker, index) => (
              <div key={index} className="mt-4 bg-gray-700 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    value={speaker.firstName}
                    onChange={(e) => handleSpeakerChange(index, "firstName", e.target.value)}
                    className="w-full mt-1 p-2 rounded bg-gray-600 text-white focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    value={speaker.lastName}
                    onChange={(e) => handleSpeakerChange(index, "lastName", e.target.value)}
                    className="w-full mt-1 p-2 rounded bg-gray-600 text-white focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Image URL</label>
                  <input
                    type="text"
                    value={speaker.imageUrl}
                    onChange={(e) => handleSpeakerChange(index, "imageUrl", e.target.value)}
                    className="w-full mt-1 p-2 rounded bg-gray-600 text-white focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  speakers: [...formData.speakers, { firstName: "", lastName: "", imageUrl: "" }],
                })
              }
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              Add Speaker
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium">Conference Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
          >
            Create Conference
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default NewConference;
