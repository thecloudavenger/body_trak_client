import React, { Component } from 'react';
import { addToCart, getCartItems } from '../services/cartService';
import { createOrder } from '../services/orderService';
import { toast } from "react-toastify";
import { getCartId } from "../services/cartService";
import Counters from './common/counters';
import 'react-toastify/dist/ReactToastify.min.css';
import { PayPalButton } from 'react-paypal-button-v2';
import { payPalClientId } from "../config.json";


class cartManager extends Component {
  state = {   
    cart: [],
    counters: [],
    totalCartPrice: 0.00
  };

  async componentDidMount() {
    toast.success('Getting Cart Items')
    this.getCartAndUpdate(0,0,false);
  }

  async getCartAndUpdate(productId,quantity,updateItem) {
    try {
      let cartId ;
      const cartResponse = await getCartId();
      if(cartResponse.data.length === 0) {
        console.log('Cart Is empty');        
      }
      else{
        cartId = (cartResponse.data[0].id);
        this.updateCartState(cartId,productId,quantity,updateItem);
      } 
      toast.success('Getting Cart Items Successful')     
    } 
    catch (error) {
      console.error('Error while getting cart details')
      toast.error('Error while getting cart details');
    }
  }

  async updateCartState(cartId,productId,quantity,updateQuantity) {
    try {
      if(updateQuantity === true){
        toast.success('Initiating Cart Update');
        await addToCart(cartId, productId, quantity);
        toast.success('Successful Cart Update');
      }

      const { data: cart } = await getCartItems(cartId);
  
      const counters = cart.map((cartItem) => ({
        id: cartItem.product.id,
        value: cartItem.quantity,
        name: cartItem.product.title,
        price: cartItem.product.unit_price,
        total_price: cartItem.quantity * cartItem.product.unit_price, 
      }));
  
      const totalCartPrice = cart.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.product.unit_price,0);
  
      this.setState({ cart, counters, totalCartPrice });
      
    } catch (error) {

      if(error.status === 400){
        console.error("Validation Error, quantity cannot be zero", error);
        toast.error('Validation Error, quantity cannot be zero')
      }
      if(error.status === 500){
        console.error("Unexpected error", error);
        toast.error('Unexpected error')
      }
    }
  }

  async handleCreateOrder() {
    try {
      let cartId ;
      const cartResponse = await getCartId();
      if(cartResponse.data.length === 0) {
        toast.success('No cart to create an order.');  
      }
      else {
        cartId = (cartResponse.data[0].id);
        toast.success('Initiating Order');
        await createOrder(cartId);  
        toast.success('Order Success');
      }
      window.location.reload(false);
    } 
    catch (error) {
      console.error('Error interacting cart:', error);
      throw error; 
    }
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.getCartAndUpdate(counters[index].id,counters[index].value,true);
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.getCartAndUpdate(counters[index].id,counters[index].value,true);
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty.</p>
        ) : (
          <div>
            <Counters
                      counters={this.state.counters}
                      onIncrement={this.handleIncrement}
                      onDecrement={this.handleDecrement}
                      onDelete={this.handleDelete}
                  />
            <p>Cart Total Price:{this.state.totalCartPrice.toFixed(2) } </p>
            <div className="checkout-section">
            <PayPalButton 
                disabled={this.state.cart.length== 0}
                amount={this.state.totalCartPrice.toFixed(2)}
                onSuccess={(details, data) => {
                  console.log(details);
                  toast.success('Successful order creation in Paypal');
                  this.handleCreateOrder();
                  toast.success('Initiating Order Update')
                  toast.success('Successful Order Update')
                }}
                onError= {(error) => {
                  console.log(error)
                  toast.error('Error Occurred')
                }}               
                options={{ 
                  clientId: payPalClientId
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default cartManager;