import React, { useEffect, useState } from "react";
import AddEmploye from "./AddEmploye";
import { ShowSuccessToast } from "../ToastMeassage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmploye from "./EditEmploye";

function EmpListing() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editUpdateData, seteditUpdateData] = useState([]);
 
  useEffect(() => {
    listingApi();
  }, []);

  const listingApi = async () => {
    const dataGet = await fetch("http://localhost:4000/users");
    try {
      const response = await dataGet.json();
      setList(response);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEdit=(editData)=>{
    seteditUpdateData(editData)
    setOpenEdit(true)
  }

  const handleDetail=()=>{

  }

  const handleDelete = async (getId) => {
    try {
      if (window.confirm("Do you sure want to Delete ?")) {
        const response = await fetch(`http://localhost:4000/users/${getId}`, {
          method: "DELETE",
        });
  
        if (response) {
          setList(list.filter((item) => item.id !== getId));
          ShowSuccessToast("Data Deleted Successfully");
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div class="container mx-auto">
      <h2 class="text-2xl font-semibold mb-6">Crud Operation</h2>
      <button
        class="bg-green-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-6"
        onClick={handleOpen}
      >
        Add Employee
      </button>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-100 border-b">
              <th class="px-4 py-2 text-left text-gray-600">Sr.No</th>
              <th class="px-4 py-2 text-left text-gray-600">Employee ID</th>
              <th class="px-4 py-2 text-left text-gray-600">Name</th>
              <th class="px-4 py-2 text-left text-gray-600">Email</th>
              <th class="px-4 py-2 text-left text-gray-600">Phone</th>
              <th class="px-4 py-2 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <>
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2">{index+1}</td>
                  <td class="px-4 py-2">{item?.id}</td>
                  <td class="px-4 py-2">{item?.name}</td>
                  <td class="px-4 py-2">{item?.email}</td>
                  <td class="px-4 py-2">{item?.phone}</td>
                  <td class="px-4 py-2">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={()=>handleEdit(item)}>
                      Edit
                    </button>
                    &nbsp; &nbsp;
                    <button
                      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(item?.id)}
                    >
                      Delete
                    </button>
                    &nbsp; &nbsp;
                    <button
                      class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleDetail(item?.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {open === true && (
        <AddEmploye
          open={open}
          setOpen={setOpen}
          list={list}
          setList={setList}
        />
      )}
      {
        openEdit === true &&
        <EditEmploye openEdit={openEdit} setOpenEdit = {setOpenEdit}  editUpdateData={editUpdateData}
        setList={setList} list={list}/>
        
      }
     
      <ToastContainer />
    </div>
  );
}

export default EmpListing;
