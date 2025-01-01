import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col"><b>{this.props.name}</b>
        </div>
        <div className="col">Price: {this.props.price}
        </div>
        <div className="col">Quantity: {this.formatCount()}
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge l-2 badge-primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
