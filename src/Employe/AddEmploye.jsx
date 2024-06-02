import React, { useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../ToastMeassage";

const AddEmploye = ({ setOpen, setList }) => {
  const [errors, setErrors] = useState({});
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));  
  };

  const validate = () => {
    const newErrors = {};

    if (!inputData.id) newErrors.id = "Employee ID is required";
    if (!inputData.name) newErrors.name = "Name is required";
    if (!inputData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(inputData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!inputData.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(inputData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      ShowErrorToast("Please fill in all fields correctly");
      return;
    }
 
      try {
        const response = await fetch("http://localhost:4000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        });
  
        if (response.ok) {
          const data = await response.json();
          setList((prev) => [...prev, data]);
          setOpen(false);
          ShowSuccessToast("Data Added Sucessfully")     
        }
      } catch (error) {
        console.log(error);
      }

    
   
  
  };
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Add Data</h2>
            <button
              className="float-right text-gray-600 hover:text-gray-800 font-bold text-2xl -mt-8"
              onClick={() => setOpen(false)}
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
                  value={inputData?.id}
                  onChange={handleChange}
                  placeholder="Enter your Employee ID"
                />
                    {errors.id && (
                <span className="text-red-500 text-sm">{errors.id}</span>
              )}
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
                  value={inputData?.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
               {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
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
                  value={inputData?.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
               {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
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
                  onChange={handleChange}
                  value={inputData?.phone}
                />
                {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
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
                  onClick={() => setOpen(false)}
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

export default AddEmploye;
