import { Component } from 'react';
import './Counter.css';

export default class Counter extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div className="counter-container">
        <h2 className="counter-header">
          <span className="counter-badge">{this.state.count}</span>
          Counter
        </h2>
        <div className="counter-buttons">
          <button className="counter-btn-primary" onClick={this.increment}>
            + Increment
          </button>
          <button className="counter-btn-outline" onClick={this.decrement}>
            − Decrement
          </button>
          <button className="counter-btn-subtle" onClick={() => this.setState({ count: 0 })}>
            ↺ Reset
          </button>
        </div>
      </div>
    );
  }
}
