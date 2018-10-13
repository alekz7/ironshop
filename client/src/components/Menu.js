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
  handleKeyPress = (e) => {
    if(e.key==="Enter"){
      this.props.buscar(this.state.itemABuscar);
    }
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
              <NavItem eventKey={1} componentClass='span'>
                <NavLink to="/" activeStyle={{color:"yellow"}} exact>Productos</NavLink>
              </NavItem>
              <NavItem eventKey={2} componentClass='span'>
                <NavLink to='/orden' activeStyle={{color:"yellow"}} exact><Glyphicon glyph="shopping-cart" /> Mi carrito</NavLink>
              </NavItem>

            </Nav>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
              </FormGroup>{' '}
              <Button type="submit" onClick={this.handleClic}>Buscar</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem eventKey={3} componentClass='span'>
                <NavLink to='/pedido' activeStyle={{color:"yellow"}} exact>Mis Pedidos</NavLink>
              </NavItem>
              <NavItem eventKey={4} componentClass='span'>
                <NavLink to='/rutas' activeStyle={{color:"yellow"}} exact>Bienvenido Alex</NavLink>
              </NavItem>              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Menu
