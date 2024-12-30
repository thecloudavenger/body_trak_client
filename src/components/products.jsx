import React, { Component } from "react";
import { getProducts } from "../services/productService";
import { createCart,addToCart } from "../services/cartService";
import { toast } from "react-toastify";

class Products extends Component {
  state = {
    products: [],
    cart: [], 
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });    
  }

  async persistCartDB(product){
    try {
      let cartId;
      const cartResponse = await createCart();
      if (cartResponse.status === 201) {
        cartId = cartResponse.data.id;
        localStorage.setItem('cartId', cartId);
        toast.success('Cart Created Successfully.')

      } else {
        console.error('Failed to create cart:', cartResponse.data);
        throw new Error('Failed to create cart.'); 
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error; 
    }
  }

  async addItemstoCart(cartId,product,quantity){
    try {
      const cartItemResponse = await addToCart(cartId,product.id,quantity);
      if (cartItemResponse.status === 201) {
        toast.success('Item added to cart Successfully.')
      } else {
        console.error('Failed to add to cart:', cartItemResponse.data);
        throw new Error('Failed to add to cart.'); 
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error; 
    }
  }

  addToCart = (product) => {
    const existingItem = this.state.cart.find((item) => item.id === product.id);
    if (!existingItem) { 
        this.setState((prevState) => ({
        cart: [...prevState.cart, { ...product, quantity: 1 }],
        }));
    }
    try {
      let cartId = localStorage.getItem('cartId');
      if (!cartId) {
        this.persistCartDB();
      }
      this.addItemstoCart(cartId,product,1);

    } catch (error) {
      console.error('Error interacting cart:', error);
      throw error; 
    }

  };

  render() {
    const { products, cart } = this.state;
    return (
      <React.Fragment>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.unit_price}</td>
                <td>
                <div className="quantity-buttons">
                    <button
                      className="add-to-cart-button"
                      onClick={() => this.addToCart(product)}
                      disabled={cart.some((item) => item.id === product.id)}
                    > Add to Cart </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>             
    );
  }
}

export default Products;