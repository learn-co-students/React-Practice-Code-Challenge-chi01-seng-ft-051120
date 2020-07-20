import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushis: [],
    eaten: [],
    displayIndex: 0,
    money: 100,
  };

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          sushis: res,
        });
      });
  }

  chooseFourSushis = () => {
    // Return 4 sushis out of the state
    // Slice takes two arguments, the first index (inclusive) and the last index (exclusive)
    return this.state.sushis.slice(
      this.state.displayIndex,
      this.state.displayIndex + 4
    );
  };

  more = () => {
    // Changes the start of the display Index
    // Updates the state which triggers a re-render
    const newDisplayIndex = this.state.displayIndex + 4;
    this.setState({
      displayIndex: newDisplayIndex,
    });
  };

  eat = (sushi) => {
    // Calculate new money
    const newMoney = this.state.money - sushi.price;
    // Check if sushi is already on the eaten list
    // Check if the balance would be negative
    if (!this.state.eaten.includes(sushi) && newMoney >= 0) {
      // Update state to reflect new item in eaten and balance
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: newMoney,
      });
    }
  };

  addMoney = (event) => {
    event.preventDefault();

    const newMoney =
      parseInt(this.state.money) + parseInt(event.target.children[0].value);

    this.setState({
      money: newMoney,
    });
  };

  render() {
    return (
      <div className="app">
        <form onSubmit={this.addMoney}>
          Add $ to Budget
          <input type="text" />
          <input type="submit" />
        </form>
        <SushiContainer
          sushis={this.chooseFourSushis()}
          more={this.more}
          eaten={this.state.eaten}
          eat={this.eat}
        />
        <Table remainingBudget={this.state.money} />
      </div>
    );
  }
}

export default App;

// We need to make money! Whenever a sushi is eaten, customers should be automatically charged!
// Based on a budget decided by you, the developer, the amount of money remaining should go down by the cost
// of the sushi that was eaten. There is a spot to display this number in the Table component
