import React, { useState } from "react";
import { ShowSuccessToast } from "../ToastMeassage";

const EditEmploye = ({ setOpenEdit, editUpdateData, setList }) => {
  const [inputEditData, setInputEditData] = useState(editUpdateData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/users/${editUpdateData?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputEditData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setList((prevList) =>
          prevList.map((item) => (item.id === data.id ? data : item))
        );
        setOpenEdit(false);
        ShowSuccessToast("Data updated Succesfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Edit Form</h2>
            <button
              className="float-right text-gray-600 hover:text-gray-800 font-bold text-2xl -mt-8"
              onClick={() => setOpenEdit(false)}
            >
              X
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="id"
                >
                  Employee ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="id"
                  type="text"
                  name="id"
                  value={inputEditData?.id}
                  onChange={handleChange}
                  placeholder="Enter your Employee ID"
                  disabled={true}
                />
              </div>
             
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={inputEditData?.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={inputEditData?.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={inputEditData?.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  type="button"
                  onClick={() => setOpenEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmploye;
