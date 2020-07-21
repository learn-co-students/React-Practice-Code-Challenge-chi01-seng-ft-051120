import React, { Fragment } from 'react'

const Sushi = (props) => {
  const {id, img_url, name, price} = props.sushi
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={() => props.eatThisSushi(id, price)}>
        { props.sushiEaten.includes(id) === true ?
            null
          :
            <img src={img_url} alt={name} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}

export default Sushi