import React from 'react'
import logo from '../logo.svg';
import { Link, NavLink } from 'react-router-dom';
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
              <Link to='/'><img src={logo} className="App-logo" alt="logo" /></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={2} componentClass='span'>
                <Link to="/">Productos</Link>
              </NavItem>
              <NavItem eventKey={2} componentClass='span'>
                <NavLink to='/orden'>Mi Pedido</NavLink>
              </NavItem>
            </Nav>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <Button type="submit" onClick={this.handleClic}>Buscar</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem eventKey={3} componentClass='span'>
                <Link to='/pedido'><Glyphicon glyph="shopping-cart" /> Mi carrito</Link>
              </NavItem>
              <NavItem eventKey={4} componentClass='span'>
                <Link to='/rutas'>Bienvenido Alex</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Menu
