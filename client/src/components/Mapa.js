/*global google*/
import React, {Component} from 'react';

import {GMap} from 'primereact/gmap';
import {Growl} from 'primereact/growl';
import {Button} from 'react-bootstrap';
import iconoFace  from '../icons/baseline-face-24px.svg';
import iconoShop  from '../icons/baseline-shopping_cart-24px.svg';
import iconFace   from '../icons/twotone-face-24px.svg';
import iconStore  from '../icons/twotone-local_grocery_store-24px.svg';
import iconShip   from '../icons/twotone-local_shipping-24px.svg';

const ironHack = {lat: 19.3977857, lng: -99.1735788};
const palacioDeportes = {lat: 19.3990549, lng: -99.113081};

class Mapa extends React.Component {
  constructor() {
    super();
    this.state = {
      markerTitle: '',
      draggableMarker: false,
      overlays: null,
      overlaysTiendas: null,
      overlaysUser: null,
      selectedPosition: null,
      ruotePlanCoordinates: []
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
  }

  updateRoutesCoordenadas = () =>{
    let newRuotePlanCoordinates =
      [{lat: ironHack.lat, lng: ironHack.lng},
        {lat: this.state.selectedPosition.lat(), lng: this.state.selectedPosition.lng()},
        {lat: palacioDeportes.lat, lng: palacioDeportes.lng}
      ];
    this.setState({ruotePlanCoordinates: newRuotePlanCoordinates});

    var flightPath2 = new google.maps.Polyline({
      path: newRuotePlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.5,
      strokeWeight: 2
    });

    this.setState({
      overlaysRoutes: [flightPath2],
      overlays: [...this.state.overlays, flightPath2],
    });
  }

  onMapReady(event) {
    this.setState({
      overlaysTiendas: [
        new google.maps.Marker({
          position: ironHack,
          icon: iconStore,
          title:"Tienda Poniente",
          draggable: false}),
        new google.maps.Marker({
          position: palacioDeportes,
          icon: iconStore,
          title:"Tienda Oriente",
          draggable: false}),
      ],
      overlays: [
        new google.maps.Marker({
          position: ironHack,
          icon: iconStore,
          title:"Tienda Poniente",
          draggable: false}),
        new google.maps.Marker({
          position: palacioDeportes,
          icon: iconStore,
          title:"Tienda Oriente",
          draggable: false}),
      ]
    })
  }

  onMapClick(event) {
    this.setState({ selectedPosition: event.latLng });
    this.agregarMarcador();

    let originOne = '' + ironHack.lat + ','+ ironHack.lng;
    let originTwo = '' + palacioDeportes.lat + ','+ palacioDeportes.lng;
    let destination = '' + this.state.selectedPosition.lat() + ','+ this.state.selectedPosition.lng();

    let parametros = {params :'units=metric&origins=' + originOne + '|' + originTwo + '&destinations=' + destination + '&mode=driving&departure_time=now&traffic_model=best_guess&key='}
    fetch('/apimapa/mapa/matrix/alex', {
      method: 'POST',
      body: JSON.stringify(parametros),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .then(
        (result) => {          
          this.updateRoutesCoordenadas();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onOverlayClick(event) {
    console.log("onOverlayClick");
    let isMarker = event.overlay.getTitle !== undefined;
    if(isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow = this.infoWindow||new google.maps.InfoWindow();
      this.infoWindow.setContent('<div>' + title + '</div>');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
      this.growl.show({severity:'info', summary:'Marker Selected', detail: title});
    }
    else {
      this.growl.show({severity:'info', summary:'Shape Selected', detail: ''});
    }
  }

  handleDragEnd(event) {
    this.growl.show({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  }

  agregarMarcador = () => {
    let newMarker = new google.maps.Marker({
      position: {
        lat: this.state.selectedPosition.lat(),
        lng: this.state.selectedPosition.lng()
      },
      icon: iconFace,
      title: "Direccion de Entrega",
      draggable: true
    });

    this.setState({
      overlays: [...this.state.overlaysTiendas, newMarker],
      overlaysUser: [newMarker],
      markerTitle: ''
    });
  }

  aceptarDireccion = () => {
    fetch('/apipedido/pedidos/edit?pedido_id=' + this.props.cualPedido , {
      method: 'POST',
      body: JSON.stringify({position: this.state.selectedPosition}),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.props.esconderMapa();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentWillMount(){
    this.setState({ overlays: this.props.cualPosicion })
  }

  render() {
        const options = {
            center: {lat: 19.3976333, lng: -99.1714448},
            zoom: 12,
            streetViewControl: false,
            mapTypeControlOptions: {
              mapTypeIds: []
            }
        };

        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <div>
                    <div className="content-section introduction">
                        <div className="feature-intro">
                            <h2>SELECCIONA TU UBICACION EN EL MAPA Y PRESIONA ACEPTAR</h2>
                        </div>
                    </div>

                    <div className="content-section implementation">
                        <Growl ref={(el) => { this.growl = el; }}></Growl>
                        <GMap overlays={this.state.overlays} options={options} style={{width: '100%', minHeight: '320px'}}
                          onMapReady={this.onMapReady}
                          onMapClick={this.onMapClick}
                          onOverlayClick={this.onOverlayClick}
                          onOverlayDragEnd={this.handleDragEnd} />
                    </div>

                    <GMapDoc />
                </div>
              </div>
              <div className="col">
                <Button bsStyle="success" bsSize="large" onClick={this.aceptarDireccion}>Aceptar >></Button>
              </div>
            </div>
          </div>


        );
    }
}


export class GMapDoc extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <div className="content-section documentation">
            </div>
        );
    }
}

export default Mapa;
