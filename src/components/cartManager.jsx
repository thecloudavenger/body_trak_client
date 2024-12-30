import React, { Component } from 'react';

class CartManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
    };
  }

  handleCreateOrder = () => {
    alert('base');
  };

  render() {
    const { products, cart } = this.state;

    return (
      <div>
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p>Price: {item.unit_price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="checkout-section">
              <button
                className="checkout-button"
                disabled={cart.length === 0}
                onClick={this.handleCreateOrder}
              >
                Create Order
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CartManager;