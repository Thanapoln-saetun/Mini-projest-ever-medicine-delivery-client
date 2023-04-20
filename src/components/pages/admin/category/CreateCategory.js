//rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//functions
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

import { Link } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  console.log("hello state user ", user.token);
  const [values, setValues] = useState({
    name: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    deleteCategory(user.token, id)
      .then((res) => {
        console.log(res);
        toast.success("Remove Data " + res.data.name + " Success!!!");
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!!! Insert Data");
      });
  };

  console.log("data", category);

  const handleChangeCategory = (e) => {//เปลี่ยนค่าใน state
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success("Insert Data " + res.data.name + " Success!!!");
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!!! Insert Data");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {/* <h1>Create Category</h1> */}
          <span class="badge" style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>
          Create Category
          </span>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Create Category</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChangeCategory}
                className="form-control mt-2"
              />
              <button className="btn btn-outline-primary mt-2">Add</button>
            </div>
          </form>
          <hr />
          <ul className="list-group">
            {category.map((item) => (
              <li className="list-group-item">
                {item.name}

                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                  onClick={() => handleRemove(item._id)}
                >
                 <a>x</a> 
                </span>

                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                >
                  <Link style={{color: 'white'}} to={"/admin/update-category/" + item._id}>
                    {/* <a href="" ></a> */}
                    Edit
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
