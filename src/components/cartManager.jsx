import React, { Component } from 'react';
import { getCartItems } from '../services/cartService';
import { createOrder } from '../services/orderService';
import { toast } from "react-toastify";
import { createCart,addToCart,getCartId } from "../services/cartService";

class cartManager extends Component {
  state = {   
    cart: []
  };

  async handleCreateOrder() {
    try {
      let cartId ;
      const cartResponse = await getCartId();
      if (cartResponse.status === 200) {
        if(cartResponse.data.length == 0)
        {
          toast.success('No cart to create an order.');  
        }
        else
        {
          cartId = (cartResponse.data[0].id);
          toast.success('Initiating Order');
          await createOrder(cartId);  
          toast.success('Order Success');     
        }
      }
      else
      {
        throw new Error('Failed to create cart.'); 
      }
    } 
    catch (error) {
      console.error('Error interacting cart:', error);
      throw error; 
    }
  };

  async componentDidMount() {
    try {
      let cartId ;
      const cartResponse = await getCartId();
      if (cartResponse.status === 200) {
        if(cartResponse.data.length == 0)
          console.log('Cart Is empty');        
        else
        {
          cartId = (cartResponse.data[0].id);
          const { data: cart } = await getCartItems(cartId);        
          this.setState({ cart });
        }
      }
      else
      {
        throw new Error('Error while getting cart details'); 
      }
    } 
    catch (error) {
      throw error; 
    }
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
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