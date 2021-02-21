import { Adress } from './../../models/adress.model';
import { AdressService } from './../../services/adress.service';
import { Router } from '@angular/router';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild, Inject } from '@angular/core';
import { computed, observable } from 'mobx-angular';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { when } from 'mobx';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MainPOIData } from './POI.list';
import { Debounce } from 'lodash-decorators';
import { } from '@angular/core';
import 'leaflet.markercluster';
// import 'leaflet-search';
import 'leaflet-routing-machine';
import 'leaflet-search';
class TransportMethod {
  timeTravel = '';
  distanceTravel = '';
  matIcon = '';
  constructor(data: any) {
    Object.assign(this, data);
  }
}

class TempAddress {
  address = '';
  lat = 0;
  lng = 0; json: any;
  transportMethods: Map<string, TransportMethod>;
  color = '';
  name = '';
  marker = L.Marker;
  constructor(data: any) {
    Object.assign(this, data);
  }
}
@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit {
  @Input() adress: Adress;
  @observable public tempAddress1 = new TempAddress({
    color: "#0074D9",
    name: "adresse_1",
    json: L.geoJSON(),
    transportMethods: {}
  });
  @observable public tempAddress2 = new TempAddress({
    color: "#FF4136",
    name: "adresse_2",
    json: L.geoJSON(),
    transportMethods: {}
  });
  @ViewChild('searchPlace') public searchElementRef: ElementRef;
  @ViewChild('searchPlace2') public searchElementRef2: ElementRef;
  @observable infoWindow: any;
  private markerAdress: any;
  @observable public map: L.Map;
  @observable public timeMeasure = true;
  @observable public adress1Updated = false;
  @observable public adress1Valid = false;
  @observable public adress1Searching = false;

  @observable public adress2Updated = false;
  @observable public adress2Valid = false;
  @observable public adress2Searching = false;
  public layersControlOptions = { position: 'bottomright' };
  public baseLayers = {
    'Open Street Map': L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    })


    //   ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   // 'Open Street Map': L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    // })
  };

  public leafletOptions = {
    scrollWheelZoom: false,
    zoom: 12,
    center: L.latLng([45.75, 4.85])
  };
  @observable public placesSearch = [];
  @observable public placesSearch2 = [];
  private openrouteKey = "5b3ce3597851110001cf6248e2ff8c969f7f415597246274c5422817";
  boundsForPoi;
  @observable listPOIs: any;
  @observable selectedItem: any;
  private markersMap: Map<string, L.Marker[]>; // Map qui contient des arrays de marker (coordonnés / title / icone) référencés par openroute_id (plusieurs par id)
  private currentMarkers: L.Marker[];
  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
    private adressService: AdressService) {
    this.markersMap = new Map<string, L.Marker[]>();
    this.currentMarkers = [];
    const carMethod = new TransportMethod({ matIcon: 'directions_car' });
    const footMethod = new TransportMethod({ matIcon: 'directions_run' });
    const bikeMethod = new TransportMethod({ matIcon: 'directions_bike' });
    this.tempAddress1.transportMethods = new Map<string, TransportMethod>([['driving-car', Object.assign({}, carMethod)], ['foot-walking', Object.assign({}, footMethod)], ['cycling-regular', Object.assign({}, bikeMethod)]]);
    this.tempAddress2.transportMethods = new Map<string, TransportMethod>([['driving-car', Object.assign({}, carMethod)], ['foot-walking', Object.assign({}, footMethod)], ['cycling-regular', Object.assign({}, bikeMethod)]]);
  }

  ngOnInit() {
    this.listPOIs = MainPOIData;
  }

  @computed get currentAdress() {
    if (this.adressService.currentAdress) {
      return this.adressService.currentAdress;
    }
  }
  @computed get allAdreses(): Adress[] {
    if (this.adressService.sortedadresses) {
      return this.adressService.sortedadresses
    }
  }
  @computed get transportMethods1(): TransportMethod[] {
    if (this.tempAddress1) {
      return Array.from(this.tempAddress1.transportMethods.values());
    }
  }

  @computed get transportMethods2(): TransportMethod[] {
    if (this.tempAddress2) {
      return Array.from(this.tempAddress2.transportMethods.values());
    }
  }



  @computed get lngAdress() {
    if (this.adress) {
      return parseFloat(
        this.adress.lng || "0"
      );
    }
  }

  @computed get latAdress() {
    if (this.adress) {
      return parseFloat(
        this.adress.lat || "0"
      );
    }
  }

  @computed get toggleText(): string {
    return this.timeMeasure ? "Temps" : "Distance";
  }

  @Debounce(1000) placeSearchChange(input) {
    let textVal = '';
    if (input === '1') {
      this.placesSearch = [];
      textVal = this.searchElementRef.nativeElement.value;
    }
    else {
      this.placesSearch2 = [];
      textVal = this.searchElementRef2.nativeElement.value
    }
    this.http.get(`https://nominatim.openstreetmap.org/search?q="${textVal}"&countrycodes=fr&polygon_geojson=1&limit=5&format=json`).subscribe((data: any[]) => {
      data.map(place => {
        if (input === '1') {
          this.adress1Searching = false;
          this.placesSearch.push({
            display_name: place.display_name, coord: [place.lat, place.lon]
          })
        }
        else {
          this.adress2Searching = false;
          this.placesSearch2.push({
            display_name: place.display_name, coord: [place.lat, place.lon]
          })
        }
      })
    })
  }

  updateTempAdress(event, input) {
    if (input === '1') {
      this.tempAddress1.address = event.target.value;
      this.adress1Updated = true;
      this.adress1Valid = false;
      this.adress1Searching = true;
      this.placeSearchChange(input);
    }
    else {
      this.tempAddress2.address = event.target.value;
      this.adress2Updated = true;
      this.adress2Valid = false;
      this.adress2Searching = true;
      this.placeSearchChange(input);
    }
  }

  // async calcItineraire(tempAdress) {
  //   if (this.map) {
  //     this.map.removeLayer(tempAdress.marker);
  //   }
  //   tempAdress.marker = new L.Marker(new L.LatLng(tempAdress.lat, tempAdress.lng), {
  //     icon: L.icon({
  //       iconUrl: '/assets/svg/Icon_Adress.svg',
  //       iconSize: [20, 20],
  //       iconAnchor: [10, 10],
  //       className: tempAdress.name
  //     })
  //   }).addTo(this.map);

  //   const requestOpts = {
  //     headers: new HttpHeaders({
  //       'Authorization': this.openrouteKey,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
  //     })
  //   };

  //   const body = {
  //     "coordinates": [[this.lngAdress, this.latAdress], [tempAdress.lng, tempAdress.lat]]
  //   }

  //   const directionsCar = this.http.post(`https://api.openrouteservice.org/v2/directions/driving-car/geojson`, body, requestOpts);
  //   await directionsCar.subscribe((data: any) => {
  //     tempAdress.transportMethods.get('driving-car').distanceTravel = `${(Math.round(data.features[0].properties.summary.distance / 100) / 10).toString()} km`;
  //     tempAdress.transportMethods.get('driving-car').timeTravel = this.secondsToHm(data.features[0].properties.summary.duration);
  //     if (tempAdress.json) {
  //       tempAdress.json.remove();
  //     }
  //     tempAdress.json = new L.GeoJSON(data.features[0].geometry, { style: { "color": tempAdress.color } }).addTo(this.map);
  //     if (this.markerAdress && tempAdress.marker) {
  //       this.map.fitBounds([tempAdress.marker.getLatLng(), this.markerAdress.getLatLng()], { maxZoom: 15 });
  //     }
  //   });

  //   const directionsFoot = this.http.post(`https://api.openrouteservice.org/v2/directions/foot-walking/geojson`, body, requestOpts);
  //   await directionsFoot.subscribe((data: any) => {
  //     tempAdress.transportMethods.get('foot-walking').distanceTravel = `${(Math.round(data.features[0].properties.summary.distance / 100) / 10).toString()} km`;
  //     tempAdress.transportMethods.get('foot-walking').timeTravel = this.secondsToHm(data.features[0].properties.summary.duration);
  //   });

  //   const directionsCycling = this.http.post(`https://api.openrouteservice.org/v2/directions/cycling-regular/geojson`, body, requestOpts);
  //   await directionsCycling.subscribe((data: any) => {
  //     tempAdress.transportMethods.get('cycling-regular').distanceTravel = `${(Math.round(data.features[0].properties.summary.distance / 100) / 10).toString()} km`;
  //     tempAdress.transportMethods.get('cycling-regular').timeTravel = this.secondsToHm(data.features[0].properties.summary.duration);
  //   });
  // }

  onAdressSelected(event: MatAutocompleteSelectedEvent, input): void {
    if (input === '1') {
      this.adress1Updated = false;
      this.tempAddress1.address = event.option.value.display_name;
      this.searchElementRef.nativeElement.value = event.option.value.display_name;
      this.tempAddress1.lat = event.option.value.coord[0];
      this.tempAddress1.lng = event.option.value.coord[1];
      // this.calcItineraire(this.tempAddress1);
      this.adress1Valid = true;
    }
    else {
      this.adress2Updated = false;
      this.tempAddress2.address = event.option.value.display_name;
      this.searchElementRef2.nativeElement.value = event.option.value.display_name;
      this.tempAddress2.lat = event.option.value.coord[0];
      this.tempAddress2.lng = event.option.value.coord[1];
      // this.calcItineraire(this.tempAddress2);
      this.adress2Valid = true;
    }
  }

  onMapReady(map: L.Map) {
    when(() => !!this.adress, () => {
      this.ngZone.run(() => {
        this.map = map;
        this.map.setView([this.latAdress, this.lngAdress], 15).getBounds();
        this.boundsForPoi = L.latLng(this.latAdress, this.lngAdress).toBounds(3000)
        this.markerAdress = new L.Marker(new L.LatLng(this.latAdress, this.lngAdress), {
          icon: L.icon({
            iconUrl: '/assets/svg/Icon_AdressSelect.svg',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })
        }).addTo(this.map);
        this.map.fitBounds(L.latLngBounds([this.markerAdress.getLatLng()]), { maxZoom: 14 });
        this.initPois();
      })
    });
  }

  secondsToHm(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);

    const hDisplay = h > 0 ? h + "h" : "";
    const mDisplay = m > 0 ? m + " min" : "";
    return hDisplay + mDisplay;
  }


  initPois() {
    this.map.setView([this.latAdress, this.lngAdress], 15);
    const requestOpts = {
      headers: new HttpHeaders({
        'Authorization': this.openrouteKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
      })
    };

    const body = {
      "request": "pois",
      "geometry": {
        "bbox": [
          [this.boundsForPoi.getNorthEast().lng, this.boundsForPoi.getNorthEast().lat],
          [this.boundsForPoi.getSouthWest().lng, this.boundsForPoi.getSouthWest().lat]
        ]
      }
    }
    this.http.post(
      'https://api.openrouteservice.org/pois', body, requestOpts)
      .subscribe(
        (data: any) => {
          const allOpenRouteElems = this.listPOIs.flatMap(category => category.children); // array de toutes les open route ids qui nous intéressent
          const features = data.features.filter(feature => allOpenRouteElems.flatMap(poi => poi.openroute_ids).includes(Object.keys(feature.properties.category_ids)[0]));
          features.forEach(element => {
            const elemId = Object.keys(element.properties.category_ids)[0];
            const iconUrl = allOpenRouteElems.find(poi => poi.openroute_ids.includes(elemId)).iconUrl;
            const marker = new L.Marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], {
              icon: L.icon({
                iconUrl: iconUrl,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                className: "activated-icon"
              })
            }).bindPopup(element.properties.osm_tags.name);
            if (!this.markersMap.has(elemId)) {
              this.markersMap.set(elemId, []);
            }
            this.markersMap.get(elemId).push(marker);
          });
          allOpenRouteElems.forEach(poi => {
            poi.count = features.filter(element => poi.openroute_ids.includes(Object.keys(element.properties.category_ids)[0])).length;
          });
          this.selectPOI(this.listPOIs[0]);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  clearMap() {
    if (this.currentMarkers.length > 0) {
      this.currentMarkers.forEach(marker => {
        marker.removeFrom(this.map);
      });
      this.currentMarkers = [];
    }
  }

  clickedMarker(window) {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.infoWindow = window;
  }

  selectPOI(item) {
    if (item !== this.selectedItem) {
      this.clearMap();
      this.selectedItem = item;
      item.children.forEach(child => {
        child.openroute_ids.forEach(openroute_id => {
          if (this.markersMap.has(openroute_id)) {
            this.markersMap.get(openroute_id).forEach(marker => {
              marker.addTo(this.map);
              this.currentMarkers.push(marker);
            });
          }
        });
      })
    }
    else {
      this.clearMap();
      this.selectedItem = !this.selectedItem;
    }
  }
}