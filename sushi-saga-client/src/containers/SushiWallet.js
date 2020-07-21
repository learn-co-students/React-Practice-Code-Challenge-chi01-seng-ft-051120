import React, {Component} from 'react'

class SushiWallet extends Component {
    
    constructor() {
        super();
        this.state = {
            money: '0'
        }
    }

    handleInput = event => {
        const input = event.target.value 
        this.setState({
            money: input
        })
    }
    
    render() { 
        return (
        <div className="sushi-wallet">
            <h2>Add money here!</h2>
            <form onSubmit={this.props.addMoney}>
                <label>How much would you like to add?</label>
                <input type="text" name="funds" value={this.state.money} onChange={this.handleInput} />
                <input type="submit" />
            </form>
        </div>
    )}
}

export default SushiWallet