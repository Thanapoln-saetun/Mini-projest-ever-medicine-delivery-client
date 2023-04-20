// rafce
import React from "react";
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

const MenubarUser = () => {
  return (
    // <nav>
    //   <ul className="nav flex-column ">

    //     <li className="nav-item">
    //       <Link to="/user/history">ประวัติการซื้อ</Link>
    //     </li>

    //     <li className="nav-item">
    //       <Link to="/user/wishlist">สินค้าที่สนใจ</Link>
    //     </li>

    //   </ul>
    // </nav>

<nav className=" navbar-expand-lg navbar-light container-fluid pt-3 pl-3 pr-3">
<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
    <Col sm={12}>
      <ListGroup>
        <ListGroup.Item action href="/user/history"   >
        Order History
        </ListGroup.Item>
        <ListGroup.Item action href="/user/wishlist">
        Watchlist
        </ListGroup.Item>
     
      </ListGroup>
    </Col>
  </Row>
</Tab.Container>
</nav>
  );
};

export default MenubarUser;
