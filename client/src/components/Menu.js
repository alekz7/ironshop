import React from 'react'
import logo from '../logo.svg';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
      itemABuscar: ""
    }
  }
  handleClic = (e) => {
    this.props.buscar(this.state.itemABuscar);
  }
  handleChange = (e) => {
    this.setState({itemABuscar: e.target.value});
  }
  render () {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home"><img src={logo} className="App-logo" alt="logo" /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/productos">
                Productos
              </NavItem>
              <NavItem eventKey={2} href="/mipedido">
                Mi Pedido
              </NavItem>
            </Nav>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <Button type="submit" onClick={this.handleClic}>Buscar</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem eventKey={3} href="#">
                <Glyphicon glyph="shopping-cart" /> Mi carrito
              </NavItem>
              <NavItem eventKey={4} href="#">
                Bienvenido Alex
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Menu
