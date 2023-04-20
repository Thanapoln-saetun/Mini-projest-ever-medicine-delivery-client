// rafce
import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';


const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  console.log(product);
  const { _id, title, description, images, price } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          className="p-1"
          style={{ height: "180px", objectFit: "cover" }}
          alt="example"
          src={images && images.length ? images[0].url : ""}
        />
      }
      actions={[
        <Link to={'/admin/update-product/'+_id}>
        <EditOutlined className="text-warning" />
        </Link>
        ,
        <DeleteOutlined
          onClick={() => handleRemove(_id)}
          className="text-danger"
        />,
      ]}
    >
      <Meta title={
        <div>
        <Row>
          <Col span={12} ><h5>{title}</h5></Col>
          <Col span={12} style={{textAlign : 'right'}}><h5 style={{ color: '#19B687'}}> {price} บาท</h5></Col>
        </Row>
        </div>


      } description={description } />
    </Card>
  );
};

export default AdminProductCard;
