//rafce
import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
//function
import { ReadCategory, EditCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const param = useParams();

  // console.log(param.id)
  const [name, setName] = useState("");
  useEffect(() => {
    //
    loadData(user.token,param.id);
  }, []);

  const loadData = (authtoken,id) => {
    ReadCategory(authtoken,id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();//ไม่ให้รีโหลด ปัญหา
    EditCategory(user.token,param.id, { name })
      .then((res) => {
        navigate("/admin/create-category");
        toast.success("Update "+ res.data.name+ " Success!!")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
            {/* <h1>Hello update page</h1> */}
        <span class="badge" style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>
        Update Category
          </span>
        

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Update Category</label>
              <input
                className="form-control mt-2"
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-outline-primary mt-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
