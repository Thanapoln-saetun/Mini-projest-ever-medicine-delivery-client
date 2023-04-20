// rafce
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../card/ProductCard";

// antd
import { Slider, Checkbox } from "antd";

// function
import { listProduct, searchFilters } from "../functions/product";
import { listCategory } from "../functions/category";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  // Category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  // console.log(search.text)
  const { text } = search;
  // text

  // 1. Load All Data
  useEffect(() => {
    //code
    loadData();
    listCategory().then((res) => setCategory(res.data));
  }, []);

  const loadData = () => {
    setLoading(true);
    // code
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // 2. load data Text
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // Filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setProduct(res.data);
    });
  };

  // 3. Load on Slider
  useEffect(() => {
    fetchDataFilter({ price }); // [0,0]
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  const handleCheck = (e) => {
    // ค่าปัจจุบันที่ Check
    let inCheck = e.target.value;

    // ค่าเดิมของ Check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDataFilter({ category: inState }); // [0,0]
    if(inState.length <1){
      loadData()
    }
  };

  return (
    <>
      <div className="container-fluid " >
        <div className="row">
          <div className="col-md-3 " style={{backgroundColor : '#F1F0F0' , height : '100vh'   , borderRadius : '10px' }}>
          <h4 className="mt-3 " > Filter / Search</h4>
            <hr />
            <h6 >ค้นหาด้วยราคาสินค้า</h6>
            <Slider value={price} onChange={handlePrice} range max={5000} />
            <hr />
            <h6>ค้นหาตามหมวดหมู่สินค้า</h6>
            {category.map((item, index) => (
              <Checkbox onChange={handleCheck} value={item._id}>
                {item.name}
              </Checkbox>
            ))}
          </div>

          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <span class="badge  " style={ {backgroundColor: '#3B82F6', color: 'white', fontSize: '50px', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', display: 'block'} }>Product</span>
            )}

            {product.length < 1 && <p>No Product found</p>}

            <div className="row pb-5">
              {product.map((item, index) => (
                <div key={index} className="col-md-4 mt-3">
                  <ProductCart product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
