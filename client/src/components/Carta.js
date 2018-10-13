import React from 'react'
import { Col, Thumbnail, Button} from 'react-bootstrap';

class Carta extends React.Component {
  render () {
    return (
      <Thumbnail src={this.props.propiedades.thumbnailImage} alt="242x200">
        <h5>{this.props.propiedades.name}</h5>
        <h3>$ {this.props.propiedades.salePrice}</h3>
        <p>
          <Button bsStyle="primary" bsSize="large" onClick={()=>{this.props.agregarItem(this.props.propiedades)}}> + Agregar al carrito</Button>
        </p>
      </Thumbnail>
    )
  }
}

export default Carta;
