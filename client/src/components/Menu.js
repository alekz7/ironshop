import React from 'react'
import logo from '../logo.svg';

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Menu = (props) => {
  return (
    <div>
      <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand"><img src={logo} className="App-logo" alt="logo" /></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
        <Nav>
            <NavItem eventKey={3} href="#">

            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>{' '}
              <Button type="submit">Submit</Button>
            </Navbar.Form>

      </NavItem>
        </Nav>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">
            Productos
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Link Right
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link Right
          </NavItem>
          <NavItem eventKey={3} href="#">

                <Navbar.Form pullRight>
                  <FormGroup>
                    <FormControl type="text" placeholder="Search" />
                  </FormGroup>{' '}
                  <Button type="submit">Submit</Button>
                </Navbar.Form>

          </NavItem>
          <NavItem eventKey={4} href="#">
            Link Right
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  )
}

export default Menu
