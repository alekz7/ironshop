import { Table, Button } from 'react-bootstrap';
import Mapa from './Mapa'
import React from 'react'
import {ProgressBar} from 'react-bootstrap';

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
  estatus = ( text ) => {
    switch(text) {
      case 'empacando':
        return <ProgressBar>
          <ProgressBar active striped bsStyle="info" label="Empacando" now={33} key={1} />
        </ProgressBar>;
        break;
      case 'en camino':
        return <ProgressBar>
          <ProgressBar striped bsStyle="success" label="Empacando" now={33} key={1} />
          <ProgressBar active striped bsStyle="info" label="En camino" now={33} key={2} />
        </ProgressBar>;
        break;
      default:
        return <ProgressBar>
          <ProgressBar striped bsStyle="success" label="Empacando" now={33} key={1} />
          <ProgressBar striped bsStyle="success" label="En camino" now={33} key={2} />
          <ProgressBar striped bsStyle="success" label="Entregado" now={33} key={3} />
        </ProgressBar>;
    }
  }
  render () {
    const visualizandoMapa = this.state.visualizandoMapa;
    return(
      <div>
        {visualizandoMapa ? (
          <Mapa cualPedido={this.state.pedidoId} cualPosicion={this.state.selectedPosition}
            esconderMapa={this.esconderMapa}/>
        ) : (
          <Table responsive striped hover condensed className="table table-sm">
            <thead>
              <tr>
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
                          <td>{pedido.usuario}</td>
                          <td>{pedido.created_at}</td>
                          <td>{pedido.carrito.totalItems}</td>
                          <td>{pedido.carrito.items.reduce(function (accumulator, item) { return accumulator + item.salePrice }, 0)}</td>
                          <td>
                            {this.estatus(pedido.estatus)}
                          </td>
                          <td><Button onClick={()=>{this.asignarPedido(pedido._id, pedido.selectedPosition)}} bsStyle="success" bsSize="large">{pedido.selectedPosition ? 'Modificar' : 'Agregar'} Direccion >></Button></td>
                        </tr>)
              })}
            </tbody>
          </Table>
        )}        
      </div>
    )
  }
}

export default Pedido;

// <td className="bg-success">{pedido.estatus}</td>
