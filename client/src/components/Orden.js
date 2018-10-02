import React from 'react'
import { Table, Button } from 'react-bootstrap';

class Orden extends React.Component {    
  render () {
    return (
      <div>
        <Table responsive striped hover condensed>
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.items.map(item=>{
              return (<tr key={item.itemId}>
                        <td width="30%"><img src={item.thumbnailImage} alt="producto" /></td>
                        <td>{item.name}</td>
                        <td>{item.salePrice}</td>
                      </tr>)
            })}
            <tr>
              <td />
              <td align="right">Total</td>
              <td>{this.props.data.items.reduce(function (accumulator, item) { return accumulator + item.salePrice }, 0)}</td>
            </tr>
            <tr>
              <td />
              <td align="right"><Button bsStyle="danger" bsSize="large">Cancelar</Button></td>
              <td><Button bsStyle="success" bsSize="large" onClick={()=>{this.props.colocarPedido(this.props.data)}}>Ordenar >></Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Orden;
