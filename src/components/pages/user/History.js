import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layouts/MenubarUser";
import { getOrders } from "../../functions/users";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import Invoice from "../../order/Invoice";


//antd
import { Space, Table, Tag } from 'antd';
import Item from "antd/lib/list/Item";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    //code
    loadData();
   
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => setOrders(res.data));
    console.log(orders);
  };



  const columns = [
    {
      title: "รายการสินค้า",
      render: (item, i) => (
        <ol>
    
          {item.products.map((p, i) => (
             
            <li>
              {p.product.title}
            </li>
           
          ))}
    
    </ol>
      ),
    },
    {
      title: "ราคาสินค้า",
      render: (item, i) => (
        <>
          {item.products.map((p, i) => (
          
          <li>
              
                {p.price} บาท
                </li>
           
          ))}
        </>
      ),
    },
    {
      title: "จำนวนสินค้า",
      render: (item, i) => (
        <>
          {item.products.map((p, i) => (
          
           
              <li>
                {p.count} ชิ้น
              </li>
           
          ))}
        </>
      ),
    },
    {
      title: "ค่าจัดส่ง",
      render: (item, i) => (
        <>
              <li>
                35 บาท
              </li>
    
        </>
      ),
    },
    {
      title: 'ราคารวมสุทธิ',
      key: 'cartTotal',
      dataIndex: 'cartTotal' ,
      render: (item, i) => (
        <>
              <li>
                {item} บาท
              </li>

        </>
      ),
     
     
    },
    {
      
      title: 'สถานะ',
      key: 'orderstatus',
      dataIndex: 'orderstatus',
      
    },
    {
      
      title: 'ใบเสร็จชำระ',
      render: (item, i) => (
        <>
       
          
           
              <li>
                <PDFDownloadLink
                        document={<Invoice order={item} />}
                        fileName="Receipt.pdf"
                        className="btn btn-primary "
                      >
                        PDF
                      </PDFDownloadLink>
              </li>
           
         
        </>
      ),
    },
  ];



  return (

   
    
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center ">
        <span class="badge " style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Order History</span>
        {/* <h1>History Page User</h1> */}
          <div className="row">
            {/* 1 Loop Order Card */}
            <Table columns={columns} dataSource={orders}/>
          </div>
        </div>
      </div>
    </div>
    
  
  );
};

export default History;
