import React from 'react';
import Products from './Products';

function Main(props) {
  return (
    <div className='main flex-80'>
      <Products
        data={props.products}
        selectedSizes={props.selectedSizes}
        handleAddCart={props.handleAddCart}
      />
    </div>
  );
}

export default Main;

