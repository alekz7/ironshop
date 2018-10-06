/*global google*/
import React, {Component} from 'react';

import {GMap} from 'primereact/gmap';
import {Growl} from 'primereact/growl';
import {Button} from 'react-bootstrap';

class Mapa extends React.Component {

    constructor() {
        super();
        this.state = {
            dialogVisible: false,
            markerTitle: '',
            draggableMarker: false,
            overlays: null,
            selectedPosition: null
        };

        this.onMapClick = this.onMapClick.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onMapClick(event) {
      console.log("onMapClick");
      this.setState({
          selectedPosition: event.latLng
      });
      this.agregarMarcador();
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
      console.log("handleDragEnd");
        this.growl.show({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }

    agregarMarcador = () => {
      console.log("Agregar Marcador");
      let newMarker = new google.maps.Marker({
                          position: {
                              lat: this.state.selectedPosition.lat(),
                              lng: this.state.selectedPosition.lng()
                          },
                          title: "Direccion de Entrega",
                          draggable: true
                      });

      this.setState({
          overlays: [newMarker],
          markerTitle: ''
      });
    }

    onMapReady(event) {
      console.log("onMapReady");
        this.setState({
            overlays: [
                new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
            ]
        })
    }

    onHide(event) {
      console.log("onHide");
        this.setState({dialogVisible: false});
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
      this.setState({
        overlays: this.props.cualPosicion
      })
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
                        <GMap overlays={this.state.overlays} options={options} style={{width: '100%', minHeight: '320px'}} onMapReady={this.onMapReady}
                            onMapClick={this.onMapClick} onOverlayClick={this.onOverlayClick} onOverlayDragEnd={this.handleDragEnd} />
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

// window.initMap = this.initMap.bind(this);
// overlays: [...this.state.overlays, newMarker],
