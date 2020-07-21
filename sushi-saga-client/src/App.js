import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint! 
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(){
    super()
    this.state = {
      sushis: [],
      startIndex: 0,
      budget: 100
    }
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(sushisArr => {
      const updatedSushis = sushisArr.map( sushiObj => {
        return {
          ...sushiObj,
          isEaten: false
        }
      })


      this.setState({
        sushis: updatedSushis
      })
    })
  }

  handleEaten = (clickedSushi) => {
    if (clickedSushi.isEaten || clickedSushi.price > this.state.budget) {
      return
    }



    const updatedSushis = this.state.sushis.map( sushiObj => {
      if (sushiObj.id === clickedSushi.id) {
        return {
          ...sushiObj,
          isEaten: true
        }
      } else {
        return sushiObj
      }
    })

    this.setState({
      sushis: updatedSushis,
      budget: this.state.budget - clickedSushi.price
    })
  }

  handleMoreButton = () => {
    this.setState({
      startIndex: this.state.startIndex + 4
    })
  }



  render() {
    const sushisToShow = this.state.sushis.slice(this.state.startIndex, this.state.startIndex + 4)

    const eatenSushis =  this.state.sushis.filter(sushi => sushi.isEaten)

    return (
      <div className="app">
        <SushiContainer 
          sushis={sushisToShow} 
          handleEaten={this.handleEaten}
          handleMoreButton={this.handleMoreButton}/>

        <Table budget={this.state.budget} eatenSushis={eatenSushis} />
      </div>
    );
  }
}

export default App;