import React from 'react';

function OrderBy(props) {
  return (
    <div className='orderby flex gap-1'>
      <h2 className='found-item'>OrderBy Filter</h2>
      <select value={props.selectedOrder} onChange={props.handleSelectedOrder}>
        <option value=''>Select</option>
        <option value='highest'>Highest to Lowest</option>
        <option value='lowest'>Lowest to Highest</option>
      </select>
    </div>
  );
}

export default OrderBy;
