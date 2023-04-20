// rafce
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


//bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Center from 'react-center';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import QRCode from 'qrcode.react';

// function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../functions/users";
import { useNavigate } from 'react-router-dom'

import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { toast } from "react-toastify";

const CheckOut = () => {

  const mystyle = {
    textAlign: "center",
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setqrCode(generatePayload(phoneNumber, { amount: total }));
  };

  const generatePayload = require('promptpay-qr');

  const phoneNumber = ("0889249523");
  const [qrCode, setqrCode] = useState("sample");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate()




  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);

    });
  }, []);

  const handleSaveAddress = () => {
    console.log(address);
    saveAddress(user.token, address).then((res) => {
      console.log(res.data);
      if (res.data.ok) {
        toast.success("Address Saved");
        setAddressSaved(true);
      }
    });
  };

  const handleCreateOrder = () => {
    // code

    saveOrder(user.token).then((res) => {
      console.log(res.data);
      // clear DB
      emptyCart(user.token);
      // clear store
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // local localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }

      toast.success("Save Order Success");
      navigate('/user/history')
    });
  };

  function handleQR() {

  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <span class="badge " style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Address</span>
          {/* <h4>Address</h4> */}
        
          {/* ข้อมูลที่อยู่สำหรับจัดส่ง พร้อมเบอร์โทรศัพท์ */}
          <textarea class="form-control w-100 "
            type="text"
            rows="3"
            placeholder="ที่อยู่สำหรับจัดส่งและเบอร์โทรศัพท์"
            value={address}

            onChange={(e) => setAddress(e.target.value)}
          />
          {/* <ReactQuill value={address} onChange={setAddress} /> */}
          <button className="btn btn-primary mt-2 " onClick={handleSaveAddress}>
            Save Address
          </button>
        </div>

        <div className="col-md-6">
        <span class="badge  " style={ {backgroundColor: '#19B687', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Order Summary</span>
          {/* <h4>Order Summary </h4> */}
          <hr />
          <p>
            Product : <b>{products.length}</b>
          </p>
          <hr />
          <p>List of product</p>
          {products.map(
            (item, i) => (
            <div key={i}>
              <>
                {item.product.title} x {item.count} = {item.price * item.count}
              </>
            </div>
          ))}
          <hr />
          Delivery : <b>35</b> <br />
          Total : <b>{total}</b>

          <br />
          <Button variant="primary" onClick={handleShow} disabled={!addressSaved || !products.length} className="mt-2">
            Check Out
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >

            <h3 style={{ paddingTop: '20px', textAlign: 'center' }}>QR ชำระเงิน</h3>
            <hr />

            <h5 style={{ textAlign: "center" }}>
              XXX XXX 1234
            </h5>
            <h6 style={{ textAlign: "center", color: 'grey' }}>
              ออมทรัพย์ XXX-X-XX123-4
            </h6>
            <img src="prompt-pay-logo.png" alt="Logo" style={{ width: '20%', margin: 'auto', display: 'block', textAlign: 'center' }} />
            <Center><QRCode value={qrCode} style={{ marginTop: '10px', width: '50%', height: '50%' }} /></Center>
            <h4 style={{ textAlign: "center", marginTop: '10px' }}>
              นายธนพล แซ่ตั้น
            </h4>
            <h6 style={{ textAlign: "center", color: 'red' }}>
              จำนวนเงิน {total} บาท
            </h6>
            
            <Modal.Footer style={{ marginTop: '20px' }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCreateOrder} >   Check Out</Button>
            </Modal.Footer>
          </Modal>

          <div>






          </div>


        </div>
      </div>
    </div>
  );
};

export default CheckOut;
