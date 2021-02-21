import { AppComponent } from './../../app.component';
import { Adress } from './../../models/adress.model';
import { AdressService } from './../../services/adress.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { observable, computed } from 'mobx-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Debounce } from 'lodash-decorators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  @observable newAdresseCreated: any;
  @observable modelAdress: any;
  @observable modelLat = "lat";
  @observable modelLng = "lng";
  @observable adresse: any;
  @observable isRequired = true;
  @ViewChild('searchPlace', { static: true }) public searchElementRef: ElementRef;
  @observable public adressUpdated = false;
  @observable public adressValid = false;
  @observable public adressSearching = false;
  @observable public placesSearch = [];
  adressesListForm: FormGroup;
  @observable date: Date;
  @observable adresseId: string;
  constructor(
    public adressService: AdressService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.adresseId = params.id;
    });
  }
  initForm() {
    this.adressesListForm = this.formBuilder.group({
      name: [""],
      adresse: ['', Validators.required],
      order: [-1]
    });
  }
  onSaveadressesList() {
    this.adressService.createNewadressesList(this.newAdresseCreated);
    this.adressesListForm.reset();
  }
  onEnter(adresse: string) {
    this.adresse = adresse;
    this.onSaveadressesList();
    this.adressesListForm.reset();
  }

  onDeleteadresse(adresse: Adress) {
    this.adressService.removeadressesList(adresse);
  }
  ngForTrackByFn(index, item) {
    return item.id;
  }

  // Drag & Drop
  dropadresse(event) {
    if (event.previousIndex !== event.currentIndex) {
      const adressesArray = Object.assign([], this.adressService.sortedadresses);
      moveItemInArray(adressesArray, event.previousIndex, event.currentIndex);
      adressesArray.forEach((adresse, i) => {
        adresse.order = i;
        this.adressService.updateadressesList(adresse);
      });
    }
  }
  @Debounce(1000) placeSearchChange() {
    let textVal = '';
    this.placesSearch = [];
    textVal = this.searchElementRef.nativeElement.value;

    this.http.get(`https://nominatim.openstreetmap.org/search?q="${textVal}"&countrycodes=fr&polygon_geojson=1&limit=5&format=json`).subscribe((data: any[]) => {
      data.map(place => {
        this.adressSearching = false;
        this.placesSearch.push({
          display_name: place.display_name, coord: [place.lat, place.lon]
        })
      })
    })
  }

  updateTempAdress(event) {
    this.adresse = event.target.value;
    this.adressUpdated = true;
    this.adressValid = false;
    this.adressSearching = true;
    this.placeSearchChange();
  }
  onAdressSelected(event: MatAutocompleteSelectedEvent): void {
    this.newAdresseCreated = new Adress({
      icon: (this.adressesListForm.get('name').value.charAt(0).toUpperCase() + this.adressesListForm.get('name').value.charAt(1).toUpperCase()),
      name: this.adressesListForm.get('name').value,
      adresse: event.option.value.display_name,
      date: Date.now(),
      order: -1,
      lat: event.option.value.coord[0],
      lng: event.option.value.coord[1]
    });
    // this.adressService.createNewadressesList(newAdresse);
    // this.adressesListForm.reset();
    this.searchElementRef.nativeElement.value = event.option.value.display_name;
    this.adressUpdated = false;
    this.adressValid = true;
    // this.adresse.adresse = event.option.value.display_name;
    // this.adresse.lat = event.option.value.coord[0];
    // this.adresse.lng = event.option.value.coord[1];
    // this.calcItineraire(this.tempAddress1);
  }
}
