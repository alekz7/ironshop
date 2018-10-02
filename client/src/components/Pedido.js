import React from 'react'
import { Table, Button } from 'react-bootstrap';

class Pedido extends React.Component {
  render () {
    return(
      <div>
        <Table responsive striped hover condensed className="table table-sm">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th> # Prod.</th>
              <th>Precio</th>
              <th>Estatus</th>
              <th>Direccion</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(pedido=>{
              return (<tr key={pedido._id} className="table-dark">
                        <td>{pedido._id}</td>
                        <td>{pedido.usuario}</td>
                        <td>{pedido.created_at}</td>
                        <td>{pedido.carrito.totalItems}</td>
                        <td>{pedido.carrito.items.reduce(function (accumulator, item) { return accumulator + item.salePrice }, 0)}</td>
                        <td className="bg-success">{pedido.estatus}</td>
                        <td><Button bsStyle="success" bsSize="large">Agregar Direccion >></Button></td>
                      </tr>)
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Pedido;
