import Main from './Main';
import Cart from './Cart';
import Sidebar from './Sidebar';
import data from '../data/data.json';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSizes: [],
      usersCart: [],
    };
  }

  // localStorage Function
  handleUpdateLocalStorage = () => {
    localStorage.setItem('carts', JSON.stringify(this.state.usersCart));
  };

  // Filter products by Size
  handleFilterBySize = (size) => {
    let { selectedSizes } = this.state;
    if (selectedSizes.indexOf(size) < 0) {
      selectedSizes = selectedSizes.concat(size);
    } else {
      let index = selectedSizes.indexOf(size);
      selectedSizes.splice(index, 1);
    }
    this.setState({ selectedSizes });
  };

  // Update local Storage
  componentDidMount() {
    if (localStorage.carts) {
      this.setState({
        usersCart: JSON.parse(localStorage.getItem('carts')),
      });
    }
    window.addEventListener('beforeunload', this.handleUpdateLocalStorage);
  }

  // Removing event listener
  componentWillUnmount() {
    window.removeEventListener(
      window.addEventListener('beforeunload', this.handleUpdateLocalStorage)
    );
  }

  // Add Item into cart
  handleAddCart = (p) => {
    let isPresent = this.state.usersCart.findIndex(
      (product) => product.id === p.id
    );
    if (isPresent >= 0) {
      this.increamentQuantity(p.id);
    } else {
      this.setState((prevState) => ({
        usersCart: prevState.usersCart.concat({ ...p, quantity: 1 }),
      }));
    }
  };

  // Increment Quantity of product
  increamentQuantity = (id) => {
    let updatedCartItems = this.state.usersCart.map((p) => {
      if (p.id === id) {
        p.quantity = p.quantity + 1;
        return p;
      }
      return p;
    });

    this.setState((prevState) => {
      return {
        usersCart: updatedCartItems,
      };
    });
  };

  // Decrement Quantity of product
  decrenmentQuantity = (id) => {
    let updatedCartItems = this.state.usersCart.map((p) => {
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
    this.setState((prevState) => {
      return {
        usersCart: updatedCartItems,
      };
    });
  };

  // Remove item from cart
  handleDeleteItemFromCart = (id) => {
    let updatedCartItems = this.state.usersCart.filter((p) => {
      return p.id !== id;
    });
    this.setState({ usersCart: updatedCartItems });
  };

  render() {
    return (
      <>
        <Sidebar
          handleFilterBySize={this.handleFilterBySize}
          selectedSizes={this.state.selectedSizes}
          {...data}
        />
        <Main
          {...data}
          selectedSizes={this.state.selectedSizes}
          handleAddCart={this.handleAddCart}
        />
        <Cart
          {...data}
          handleReduceQuantityFromCart={this.handleReduceQuantityFromCart}
          usersCart={this.state.usersCart}
          increamentQuantity={this.increamentQuantity}
          decrenmentQuantity={this.decrenmentQuantity}
          handleDeleteItemFromCart={this.handleDeleteItemFromCart}
        />
      </>
    );
  }
}

export default App;
