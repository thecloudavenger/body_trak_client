import React, { Component } from "react";
import { getOrders } from "../services/orderService";
import moment from 'moment';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

class Orders extends Component {
    
    state = {
      orders: []
    };
  
    async componentDidMount(){    
      toast.success('Getting Orders')
      const {data : orders} = await getOrders();
      this.setState( {orders});
      toast.success('Getting Orders Successful')
    }
    render() {
      return (
        <React.Fragment>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Payment Status</th>
              <th>Placed At</th>
              <th>Total Order Price</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.payment_status}</td>
                <td>{moment(order.placed_at).format('YYYY-MM-DD HH:mm:ss')}</td> 
                <td>{(order.total_order_price).toFixed(2)}</td> 
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.product.title} - {item.quantity} x {item.unit_price} = {item.unit_price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
      );
    }
  }
  
  export default Orders;