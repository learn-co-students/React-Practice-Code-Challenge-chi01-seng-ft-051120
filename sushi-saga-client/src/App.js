import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import SushiWallet from './containers/SushiWallet'

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super();
    this.state = {
      sushi: [],
      sushiStart: 0,
      sushiEnd: 4,
      sushiEaten: [],
      remainingBudget: 100
    }
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(sushiData => {
      this.setState({
        sushi: sushiData
      })
    })
  }

  sliceSushi = () => {
    return this.state.sushi.slice(this.state.sushiStart, this.state.sushiEnd)
  }

  shiftSushi = () => {
    if (this.state.sushiEnd !== 100) {
    const newSushiStart = this.state.sushiStart + 4
    const newSushiEnd = this.state.sushiEnd + 4
    this.setState({
      sushiStart: newSushiStart,
      sushiEnd: newSushiEnd
    })} else {
      this.setState({
        sushiStart: 0,
        sushiEnd: 4
      })
    }
  }

  eatThisSushi = (id, price) => {
      const sushis = this.state.sushiEaten.slice()
      sushis.push(id)
      const newBudget = this.state.remainingBudget - price
      if (newBudget >= 0) { 
      this.setState({
        sushiEaten: sushis,
        remainingBudget: newBudget
      })}
  }

  addMoney = money => {
    const moneyInt = parseInt(money, 10)
    if (moneyInt > 0) {
    const newBudget = this.state.remainingBudget + moneyInt
      if (isNaN(newBudget) === false) {
      this.setState({
        remainingBudget: newBudget
      })}}
  }

  render() {
    const sushiToPass = this.state.sushi.slice(this.state.sushiStart, this.state.sushiEnd)
    return (
      <div className="app">
        <SushiWallet addMoney={this.addMoney}/>
        <SushiContainer eatThisSushi={this.eatThisSushi} sushiEaten={this.state.sushiEaten} shiftSushi={this.shiftSushi} sushi={sushiToPass} />
        <Table remainingBudget={this.state.remainingBudget} sushiEaten={this.state.sushiEaten} />
      </div>
    );
  }
}

export default App;