// rafce
import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'antd';

// lodash
import _ from 'lodash'

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  


   console.log("product",product);
  const { _id, title, description, images, price } = product;

  const handleAddToCart = () =>{
    let cart = []
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart')) 
    }
    cart.push({
      ...product,
      count:1
    })
    let unique = _.uniqWith(cart,_.isEqual)

    localStorage.setItem("cart",JSON.stringify(unique) )
    
    
    dispatch({
      type:"ADD_TO_CART",
      payload:unique
    })
    dispatch({
      type:'SET_VISIBLE',
      payload:true
    })

  }

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
        <Link to={'/product/'+_id}>
        <EyeOutlined className="text-warning" />
        </Link>
        ,
        <ShoppingCartOutlined
          onClick={handleAddToCart}
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

export default ProductCard;
