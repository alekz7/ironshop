import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu'
import Orden from './components/Orden'
import Product from './components/Product'
import Pedido from './components/Pedido'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      buscar: "",
      items: [],
      myCart: {
        items: [],
        totalItems: 0,
      },
      pedidos: []
    };
  }
  buscar = (itemABuscar) => {
    fetch("/apiwalmart/walmart/" + itemABuscar)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  agregarItem = (item) => {
    const oldCart = this.state.myCart;
    var newCart = oldCart;
    newCart.items = [...oldCart.items,item];
    newCart.totalItems = newCart.items.length;
    this.setState({
      myCart: newCart
    });
  }
  limpiarCarrito = () => {
    this.setState({
      myCart: {
        items: [],
        totalItems: 0,
      }
    });
  }
  colocarPedido = (carrito) => {
    fetch('/apipedido/pedidos/add', {
      method: 'POST',
      body: JSON.stringify(carrito),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.limpiarCarrito();
          this.consultarPedidos();
          // pedido
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  componentWillMount() {
    this.buscar("toys");
    this.consultarPedidos();
  }
  consultarPedidos = () =>{
    fetch('/apipedido/pedidos')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            pedidos: result.items
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  render() {
    return (
      <div className="App">
        <Menu buscar={this.buscar}/>
        <Product data={this.state.items} agregarItem={this.agregarItem}/>
        <Orden data={this.state.myCart} colocarPedido={this.colocarPedido}/>
        <Pedido data={this.state.pedidos} handleClick={this.colocarPedido} />
      </div>
    );
  }
}

export default App;
