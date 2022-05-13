import React, { useState, useEffect } from 'react';

import Main from './Main';
import Cart from './Cart';
import Sidebar from './Sidebar';
import data from '../data/data.json';

function App() {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [usersCart, setUsersCart] = useState(
    JSON.parse(localStorage.getItem('carts')) || []
  );

  useEffect(() => {
    handleUpdateLocalStorage();
  }, [usersCart]);

  function handleUpdateLocalStorage() {
    localStorage.setItem('carts', JSON.stringify(usersCart));
  }

  // Filter products by Size
  const handleFilterBySize = (size) => {
    let index = selectedSizes.indexOf(size);
    let newSelecetedSizes = [];
    if (index < 0) {
      newSelecetedSizes = selectedSizes.concat(size);
    } else {
      newSelecetedSizes = selectedSizes.filter((size, i) => i !== index);
    }
    setSelectedSizes(newSelecetedSizes);
  };

  // Add Item into cart
  const handleAddCart = (p) => {
    let isPresent = usersCart.findIndex((product) => product.id === p.id);
    if (isPresent >= 0) {
      increamentQuantity(p.id);
    } else {
      setUsersCart(usersCart.concat({ ...p, quantity: 1 }));
    }
  };

  // Increment Quantity of product
  const increamentQuantity = (id) => {
    let updatedCartItems = usersCart.map((p) => {
      if (p.id === id) {
        p.quantity = p.quantity + 1;
        return p;
      }
      return p;
    });

    setUsersCart(updatedCartItems);
  };

  // Decrement Quantity of product
  const decrenmentQuantity = (id) => {
    let updatedCartItems = usersCart.map((p) => {
      if (p.id === id) {
        if (p.quantity === 1) {
          p.quantity = 1;
        } else {
          p.quantity = p.quantity - 1;
        }
        return p;
      }
      return p;
    });
    setUsersCart(updatedCartItems);
  };

  // Remove item from cart
  const handleDeleteItemFromCart = (id) => {
    let updatedCartItems = usersCart.filter((p) => {
      return p.id !== id;
    });
    setUsersCart(updatedCartItems);
  };

  return (
    <>
      <Sidebar
        handleFilterBySize={handleFilterBySize}
        selectedSizes={selectedSizes}
        {...data}
      />
      <Main
        {...data}
        selectedSizes={selectedSizes}
        handleAddCart={handleAddCart}
      />
      <Cart
        {...data}
        // handleReduceQuantityFromCart={handleReduceQuantityFromCart}
        usersCart={usersCart}
        increamentQuantity={increamentQuantity}
        decrenmentQuantity={decrenmentQuantity}
        handleDeleteItemFromCart={handleDeleteItemFromCart}
      />
    </>
  );
}

export default App;
