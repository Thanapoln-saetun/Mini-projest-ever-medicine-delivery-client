// rafce
import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);

      let allfileUpload = values.images; //[] array
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(//resize รูป
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {//uri คือ รูปที่ resize 
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allfileUpload.push(res.data);//เก็บรูปที่ upload ไปไว้ใน allfileUpload
                console.log("allfileupload in then", allfileUpload);
                setValues({ ...values, images: allfileUpload });//เก็บรูปที่ upload ไปไว้ใน images
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true)
    console.log(public_id);
    // const img = values.images
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      // ค่าไม่หายเลยต้องอัพเดทค่าใน state ด้วย
      .then((res) => {
        setLoading(false)
        let filterImages = images.filter((item) => {//filter รูปที่ไม่ตรงกับ public_id ที่เรากดลบ
          return item.public_id !== public_id;//return ค่าที่ไม่ตรงกับ public_id ที่เรากดลบ
        });
        setValues({ ...values, images: filterImages });//set ค่าใหม่
      })
      .catch((err) => {
        //err
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <>
      <br />
      {values.images &&
        values.images.map((c) => (
          <span className="avatar-item">
            <Badge
              onClick={() => handleRemove(c.public_id)}
              style={{ cursor: "pointer" }}
              count="X"
            >
              <Avatar className="m-3" src={c.url} shape="square" size={120} />
            </Badge>
          </span>
        ))}

      <hr />
      <div className="form-group">
        <label className="btn btn-primary">
          Choose File...
          <input
            onChange={handleChangeFile}
            className="form-control"
            type="file"
            hidden
            multiple
            accept="images/*"
            name="file"
          />
        </label>
      </div>
      <br />
    </>
  );
};

export default FileUpload;
