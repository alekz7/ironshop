import React from 'react'
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Carta from './Carta'

class Product extends React.Component {
  render () {
    return (
      <div>
        <Grid>
          <Row>
            {this.props.data.map(item=>{
              return <Carta propiedades={item} agregarItem={this.props.agregarItem}/>
            })}
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Product;

// {this.state.buscar} ? <h1>Resultados para {this.state.buscar}</h1> : <h1>Productos</h1>

// var itemFake = {
//   thumbnailImage : "./images/cherries.jpeg",
//   name : "fake",
//   salePrice : 12.99,
//   itemId : "999"
// }
//
// var itemFake2 = {
//   thumbnailImage : "./images/cherries.jpeg",
//   name : "fake 2",
//   salePrice : 12.99,
//   itemId : "888"
// }
//
// <Carta propiedades={itemFake} agregarItem={this.props.agregarItem}/>
// <Carta propiedades={itemFake2} agregarItem={this.props.agregarItem}/>
