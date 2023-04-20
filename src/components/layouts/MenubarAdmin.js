// rafce
import React from "react";
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { AiFillDashboard } from 'react-icons/ai';






const MenubarAdmin = () => {
  return (
    // <>
    //  <ul className="nav flex-column">
    //     <li className="nav-item ">
    //       <Link to="/admin/index">แดชบอร์ด</Link>
    //     </li>

    //     <li className="nav-item mt-10">
    //       {/* <a href=""></a> */}
    //       <Link to="/admin/manage-admin"> จัดการผู้ใช้งาน</Link>
    //     </li>

    //     <li className="nav-item">
    //       {/* <a href=""></a> */}
    //       <Link to="/admin/create-category"> เพิ่มหมวดหมู่</Link>
    //     </li>

    //     <li className="nav-item">
    //       {/* <a href=""></a> */}
    //       <Link to="/admin/create-product"> เพิ่มสินค้า</Link>
    //     </li>

    //     <li className="nav-item">
    //       {/* <a href=""></a> */}
    //       <Link to="/admin/orders"> จัดการ order</Link>
    //     </li>
       

    //   </ul>
    // </>
    <nav className=" navbar-expand-lg navbar-light container-fluid pt-3 pl-3 pr-3">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={12}>
            <ListGroup>
              <ListGroup.Item action href="/admin/index"   >
        
              Admin Dashboard
              </ListGroup.Item>
              <ListGroup.Item action href="/admin/manage-admin">
              User Management
              </ListGroup.Item>
              <ListGroup.Item action href="/admin/create-category">
              Create Category
              </ListGroup.Item>
              <ListGroup.Item action href="/admin/create-product">
              Create Product
              </ListGroup.Item>
              <ListGroup.Item action href="/admin/orders">
              Order Management
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Tab.Container>
    </nav>


  );
};

export default MenubarAdmin;
