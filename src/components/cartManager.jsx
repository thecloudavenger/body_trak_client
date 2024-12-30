import React, { Component } from 'react';
import { getCartItems } from '../services/cartService';
import { createOrder } from '../services/orderService';
import { toast } from "react-toastify";
import { addToCart } from '../services/cartService';

class cartManager extends Component {
  state = {   
    cart: []
  };

  async handleCreateOrder() {
    try {
      let cartId = localStorage.getItem('cartId');
      if (cartId) {
        await createOrder(cartId);
        localStorage.removeItem('cartId');
        toast.success('Order Created Successfully.');
      }
    } catch (error) {
      console.error('Error interacting cart:', error);
      throw error; 
    }
  };

  async componentDidMount() {
    try {
      let cartId = localStorage.getItem('cartId');
      if (cartId) {
        const { data: cart } = await getCartItems(cartId);
        this.setState({ cart });
      }
    } catch (error) {
      console.error('Error interacting cart:', error);
      throw error; 
    }
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart"></p>
        ) : (
          <div>
            <ul>
              {cart.items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-details">
                      <h3>{item.product.title}</h3>
                      <p>Unit Price: {item.product.unit_price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p>Cart Total Price:{cart.total_price} </p>
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

export default cartManager;