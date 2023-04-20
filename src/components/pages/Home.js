import React from "react";
import NewProduct from "../home/NewProduct";
import BestSeller from '../home/BestSeller'
import Badge from 'react-bootstrap/Badge';
const Home = () => {
  return (

    <div className="body" >
       <img src="medical5.png" alt="banner" class="img-fluid   rounded w-100" />
      {/* <div className="jumbotron container mt-4">
        <h1 className="display-4 mt-3 text-center">สั่งยาออนไลน์ผ่านแชทกับเภสัชง่ายๆ</h1>
        <p className="lead text-center mb-4">เรามีบริการส่งยาไปที่บ้าน สะดวก รวดเร็ว และมีความปลอดภัย</p>
    
      
      </div> */}
      
      
      
      {/* New Product */}
      <div className="bg ">
      <h4 
      className="text-center p-3    mb-5 display-4 jumbotron   ">
         <span class="badge  " style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>New Product</span>
       </h4>
         <NewProduct />   
        





      {/* Best Seller */}
      <div >
     
      <h4 
      className="text-center p-3 mt-5   display-4 jumbotron   ">
          <span class="badge mb-5" style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Best Sellers</span>
       </h4>
       
       
        <BestSeller  />
        <a href="/shop"><img src="medical(2).png" alt="banner" class="img-fluid   rounded w-100" /></a>
        </div>
        </div>

    </div>
  );
};

export default Home;
