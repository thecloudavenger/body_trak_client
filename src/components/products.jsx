import React, { Component } from "react";
import { getProducts } from "../services/productService";


class Products extends Component {
  state = {
    products: [],
    cart: [], 
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  addToCart = (product) => {
    const existingItem = this.state.cart.find((item) => item.id === product.id);
    if (!existingItem) { 
        this.setState((prevState) => ({
        cart: [...prevState.cart, { ...product, quantity: 1 }],
        }));
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
                    > + </button>
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