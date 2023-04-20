// rafce
import React, { useState, useEffect } from "react";
//function
import { listProductBy } from "../functions/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";



const BestSeller = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      //
      loadData();
    }, []);
  
    const loadData = () => {
      setLoading(true);
      listProductBy("sold", "desc", 3)//เช็คจำนวน 3 อันดับแรกจาก sold (listProductBy)
        .then((res) => {
          //code
          setLoading(false);
          setProducts(res.data);
        })
        .catch((err) => {
          //code
          setLoading(false);
          console.log(err);
        });
    };


    return (
        <>
        <div className="container">
          {loading ? (
            <LoadingCard count={3}/>
          ) : (
            <div className="row">
              {products.map((item, index) => (
                <div key={index} className="col-md-4">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    )
}

export default BestSeller
