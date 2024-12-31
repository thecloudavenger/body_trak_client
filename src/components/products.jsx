import React, { Component } from "react";
import { getProducts } from "../services/productService";
import { createCart,addToCart,getCartId,getCartItems } from "../services/cartService";
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

  async persistCartAndAddItem(product, quantity) {
    try {
      let cartId;      
      // Step 1: Fetch existing cart or create a new one
      const cartResponse = await getCartId(); //TOBEFIXED
      if (cartResponse.status === 200) {
        if(cartResponse.data.length == 0)
        {
          const createCartResponse = await createCart();
          if (createCartResponse.status === 201) {
            cartId = createCartResponse.data.id;
            toast.success("Cart created successfully.");
          } else {
            throw new Error("Failed to create a cart.");
          }
        }       
        else
        {
          cartId = (cartResponse.data[0].id);
          const { data: cart } = await getCartItems(cartId);        
          this.setState({ cart });
        }
      }
      else {
        throw new Error("Failed to fetch cart information.");
      }


      // Step 2: Add item to the cart
      const cartItemResponse = await addToCart(cartId, product.id, quantity);
      if (cartItemResponse.status === 201) {
        toast.success("Item added to cart successfully.");
      } else {
        console.error("Failed to add to cart:", cartItemResponse.data);
        throw new Error("Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error in cart operation:", error);
      toast.error("An error occurred while processing your request.");
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
      this.persistCartAndAddItem(product,1);
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