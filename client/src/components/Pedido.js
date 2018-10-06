import Mapa from './Mapa'
import { Table, Button } from 'react-bootstrap';
import React from 'react'

class Pedido extends React.Component {
  state = {
    visualizandoMapa: false,
    pedidoId: '',
    selectedPosition: null
  }
  esconderMapa = () => {
    this.setState({
      pedidoId: '',
      visualizandoMapa: false,
      selectedPosition: null
    })
  }
  asignarPedido = (pedidoId, selectedPosition) => {
    this.setState({
      pedidoId,
      visualizandoMapa: true,
      selectedPosition: selectedPosition
    })
  }
  render () {
    const visualizandoMapa = this.state.visualizandoMapa;
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
                        <td><Button onClick={()=>{this.asignarPedido(pedido._id, pedido.selectedPosition)}} bsStyle="success" bsSize="large">{pedido.selectedPosition ? 'Modificar' : 'Agregar'} Direccion >></Button></td>
                      </tr>)
            })}
          </tbody>
        </Table>

          {visualizandoMapa ? (
            <Mapa cualPedido={this.state.pedidoId} cualPosicion={this.state.selectedPosition}
              esconderMapa={this.esconderMapa}/>
          ) : (
            <div />
          )}

      </div>
    )
  }
}

export default Pedido;
