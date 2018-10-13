import './App.css';
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Menu from './components/Menu'
import Orden from './components/Orden'
import Product from './components/Product'
import Pedido from './components/Pedido'
import Rutas from './components/Rutas'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
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
  componentWillMount() {
    this.buscar("toys");
    this.consultarPedidos();
  }
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Menu buscar={this.buscar} loggedIn={this.state.loggedIn} login={this.login}/>
            <Route exact path='/' render={(props)=><Product {...props} data={this.state.items} agregarItem={this.agregarItem}/>}/>
            <Route exact path='/orden' render={(props)=><Orden {...props} data={this.state.myCart} colocarPedido={this.colocarPedido} limpiarCarrito={this.limpiarCarrito}/>}/>
            <Route exact path='/pedido' render={(props)=><Pedido {...props} data={this.state.pedidos} handleClick={this.colocarPedido}/>}/>
            <Route exact path='/rutas' render={(props)=><Rutas {...props} component={Rutas} data={this.state.pedidos}/>}/>
          </div>
        </Router>
      </div>
    );
  }

  login = () => {
    this.setState({loggedIn:true});
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
          this.limpiarCarrito();
          this.consultarPedidos();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  consultarPedidos = () =>{
    fetch('/apipedido/pedidos')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pedidos: result.items
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

export default App;
