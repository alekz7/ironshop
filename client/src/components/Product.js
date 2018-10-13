import React from 'react'
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Carta from './Carta'

class Product extends React.Component {
  render () {
    return (
      <div>
        <div className="content">
          <div className="container">
            <div className="row">
                {this.props.data.map(item=>{
                  return <div className="col-xs-12 col-md-3"><Carta propiedades={item} agregarItem={this.props.agregarItem}/></div>
                })}              
            </div>
          </div>
        </div>
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



// <div>
//   <Grid>
//     <Row>
//       {this.props.data.map(item=>{
//         return <Col md={3}>
//           <Carta propiedades={item} agregarItem={this.props.agregarItem}/>
//           <Col />
//       })}
//     </Row>
//   </Grid>
// </div>
//
