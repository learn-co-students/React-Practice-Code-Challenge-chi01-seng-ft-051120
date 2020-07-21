import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  const renderSushi = () => {
    return props.sushi.map((item, index) => {
      return <Sushi eatThisSushi={props.eatThisSushi} sushiEaten={props.sushiEaten} key={index} sushi={item} />
    })
  }
  
  
  return (
    <Fragment>
      <div className="belt">
        {renderSushi()}
        <MoreButton shiftSushi={props.shiftSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer