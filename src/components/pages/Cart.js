// rafce
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableInCart from "../card/ProductTableInCart";
import { useNavigate } from "react-router-dom";

// function
import { userCart } from "../functions/users";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price ;
    }, 0);
  };

 
 

  const handleSaveOrder = () => {
    // code
    alert("CheckOut Order");
    userCart(user.token, cart)
      .then((res) => {
        console.log(res);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <td>Image</td>
          <td>Title</td>
          <td>Price</td>
          <td>Count</td>
          <td>Remove</td>
        </tr>
      </thead>
      {cart.map((item) => (
        <ProductTableInCart key={item._id} item={item}  />
      ))}
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
        <span class="badge  " style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Cart / {cart.length} product</span>
          {/* <h4> Cart / {cart.length} product</h4> */}
          {!cart.length ? <p>No Product in Cart</p> : showCartItem()} {/* ถ้าไม่มีสินค้าในตะกร้า จะแสดงข้อความ No Product in Cart */}
          <p style={{color: 'red',textAlign: 'center', fontSize: '13px'}}>***ปรึกษาเภสัชกรพร้อมจัดส่งยาถึงบ้าน ปลอดภัย มั่นใจมากยิ่งขึ้นผ่านแชท Messenger***</p>
        </div>

        <div className="col-md-4">
        <span class="badge  " style={ {backgroundColor: '#19B687', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Summary</span>
          {/* <h4>Summary</h4> */}
          <hr />
          {cart.map((item, index) => (
            <p key={index}>
              {item.title} x {item.count} = {item.price * item.count}
              
            </p>
          ))}
          
        
          <hr  />
          Delivery :<b> 35</b> <br />
          
          Total : <b> {getTotal()+ 35} </b>
          <hr />
          {user ? (
            <button
              className="btn btn-success"
              onClick={handleSaveOrder}
              disabled={!cart.length}
            >
              Check Out
            </button>
          ) : (
            <button className="btn btn-danger">
              <Link to="/login" state="cart">
                Login to CheckOut
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
