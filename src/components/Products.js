import React, { useState } from 'react';
import OrderBy from './OrderBy';

function Products(props) {
  const [selectedOrder, setSelectedOrder] = useState('');

  // Selected order of product
  const handleSelectedOrder = (event) => {
    setSelectedOrder(event.target.value);
  };

  // Filter Product by size
  const handleDataFilter = (sizes) => {
    let order = selectedOrder;
    let sortedProducts = [...props.data];

    if (sizes.length) {
      sortedProducts = sortedProducts.filter((p) => {
        if (sizes.filter((size) => p.availableSizes.includes(size)).length) {
          return p;
        }
        return null;
      });
    }

    if (order === 'highest') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (order === 'lowest') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    return sortedProducts;
  };

  let data = handleDataFilter(props.selectedSizes);
  return (
    <div className=''>
      <div className='products-filter flex space-btw'>
        <p className='found-item'>{`${data.length} product${
          data.length > 1 ? 's' : ''
        } found.`}</p>
        <OrderBy
          handleSelectedOrder={handleSelectedOrder}
          selectedOrder={selectedOrder}
        />
      </div>
      <div>
        <ul className='products-holder flex gap-2 wrap'>
          {data.map((productInfo) => {
            return (
              <Product
                key={productInfo.id}
                {...productInfo}
                handleAddCart={props.handleAddCart}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Product(props) {
  let item = props;
  return (
    <li key={item.id} className='single-product flex-25 center'>
      <div className='product-info'>
        <div>
          <div className='img-holder'>
            <img
              className='product-img'
              src={`/static/products/${item.sku}_1.jpg`}
              alt='product-img'
            />
            {item.isFreeShipping ? (
              <span className='shipping-free'>Shipping Free</span>
            ) : (
              ''
            )}
          </div>
          <div>
            <h3 className='product-name'>{item.title}</h3>
            <h3 className='product-other-info padd-1'>{item.style}</h3>
            <div className='empty'></div>
            <h2 className='product-price padd-1'>${item.price}</h2>
          </div>
        </div>
      </div>
      <button
        onClick={() => props.handleAddCart(item)}
        className='btn add-product'
      >
        Add to Cart
      </button>
    </li>
  );
}

export default Products;
