// rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";
// function
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        //code
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    listCategory(user.token)
      .then((res) => {
        //code
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(values);
  console.log(category);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    updateProduct(user.token,values._id,values)
      .then((res)=>{

        setLoading(false)
        toast.success('Update '+res.data.title+" Success")
        console.log(res)
        navigate('/admin/index')
      }).catch((err)=>{
        toast.error('Update Error')
        setLoading(false)
        console.log(err)
      })
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading 
          ? <h1>Loading...</h1>
          : <h1><span class="badge" style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Product Update</span> </h1>
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
                value={values.category._id}
                required
              >
                <option>Please Select</option>
                {category.length > 0 &&
                  category.map((item) => (
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

            <button className="btn btn-primary mb-5">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
