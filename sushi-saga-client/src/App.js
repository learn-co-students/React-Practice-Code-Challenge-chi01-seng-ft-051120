import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sushi: [],
      render4Sushi: 0,
      balance: 100,
      emptyPlates: [],
    };
  }

  displaySushi = () => {
    return this.state.sushi.slice(
      this.state.render4Sushi,
      this.state.render4Sushi + 4
    );
  };

  nextSushi = () => {
    const next = this.state.render4Sushi + 4;
    this.setState({
      render4Sushi: next,
    });
  };

  componentDidMount = () => {
    fetch(API)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          sushi: this.addEatenKey(data),
        })
      );
  };

  addEatenKey = (sushiArray) => {
    sushiArray.forEach((sushiObj) => (sushiObj.isEaten = false));
    return sushiArray;
  };

  handleEaten = (sushiObj) => {
    if (sushiObj.price > this.state.balance || sushiObj.isEaten === true) {
      return;
    }
    const plate = this.state.emptyPlates.concat(sushiObj);
    const newBalance = this.state.balance - sushiObj.price;
    const newSushi = this.state.sushi.map((sushi) => {
      if (sushi.id === sushiObj.id) {
        return { ...sushi, isEaten: true };
      } else {
        return sushi;
      }
    });
    this.setState({
      sushi: newSushi,
      balance: newBalance,
      emptyPlates: plate,
    });
  };

  render() {
    console.log(this.state.emptyPlates);
    return (
      <div className="app">
        <SushiContainer
          sushi={this.displaySushi()}
          nextSushi={this.nextSushi}
          handleEaten={this.handleEaten}
        />
        <Table
          balance={this.state.balance} handlePlate={this.state.emptyPlates}
        />
      </div>
    );
  }
}

export default App;
