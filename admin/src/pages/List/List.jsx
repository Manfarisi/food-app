import React from "react";
import "./List.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const List = ({url}) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();


  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const editFood = (id) => {
    navigate(`/list/edit/${id}`);
    console.log(id)
  };

  const removeFood = async(foodId)=>{
    const respone = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList()
    if(respone.data.success){
        toast.success(respone.data.message)
    }else{
        toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>            
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <div className="actions">
                <p className="edit" onClick={() => editFood(item._id)}>Edit</p>
                <p onClick={()=>removeFood(item._id)} className="delete">Delete</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
