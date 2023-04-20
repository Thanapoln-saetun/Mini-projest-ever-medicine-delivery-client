import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// functions
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

import FileUpload from "./FileUpload";
import { Spin } from 'antd';


const initialstate = {
  title: "ยา",
  description: "รายละเอียดยา",
  categories: [],
  category: "",
  price: "100",
  quantity: "5",
  images: [],
};

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("values", values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)//ส่งค่าไปที่ function createProduct
      .then((res) => {
        console.log(res);
        toast.success("Insert " + res.data.title + " Success!!");//แสดงข้อความเมื่อเพิ่มข้อมูลสำเร็จ
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading
            ? <h1>Loading...<Spin /></h1>//true
            : <h1><span class="badge" style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Create Product</span></h1>//false
          }
          

          <form onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <label>Title</label>
              <input
                className="form-control mt-2"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

        

            <div className="form-group mt-2">
              <label>Price</label>
              <input
                className="form-control mt-2"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>
          
           
            <div className="form-group mt-2">
              <label>Quantity</label>
              <input
                className="form-control mt-2"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label>Category</label>
              <select
                className="form-control mt-2"
                name="category"
                onChange={handleChange}
                required
              >
                <option>Please Select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group mt-2">
              <label>Description</label>
              <textarea 
                className="form-control mt-2"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <FileUpload 
            loading={loading}
            setLoading={setLoading}
            values={values} 
            setValues={setValues} 
            />

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
