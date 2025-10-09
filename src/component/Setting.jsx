import React, { use, useState } from "react";
import axios from "axios";
import api from "../services/api.js";
import { useUser } from "../context/userContext.jsx";
import { set } from "mongoose";
const Setting = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
const {user,setUser}=useUser()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file)); // preview before upload
  };

  const handleUpload = async () => {
    if (!avatar) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const { data } = await api.post(
        "/api/v1/auth/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Avatar uploaded!");
      console.log(data);
      setUser(...user,user.avatar=data.avatar)
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  return (
      <div className="max-w-4xl space-y-8">
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Update Profile Picture</h2>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
      )}

      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
            {/* Profile Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" defaultValue={user?user.username:"dinesh"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" defaultValue={user?user.email:"dinesh@.com"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-not-allowed" disabled/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea rows="3" defaultValue={user?user.bio:""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </div>
            </div>

          
           
            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
  )
}

export default Setting