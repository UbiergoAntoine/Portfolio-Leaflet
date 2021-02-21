import { Adress } from './../models/adress.model';
import { Injectable } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  @observable currentAdress: Adress;
  @observable adress: Adress[] = [];
  constructor() {
    this.getadressesList();
  }

  @computed get isCurrentAdress(): Adress {
    if (!!this.currentAdress) {
      console.log('HEY  !!!!!');
      return this.currentAdress;
    }
  }
  @computed get sortedadresses() {
    if (this.adress) {
      return Array.from(
        this.adress).slice().sort((a: Adress, b: Adress) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          } else {
            return 0;
          }
        });
    }
    return [];
  }
  createNewadressesList(newadresses) {
    this.adress.push(newadresses);
    const newadressesId = firebase.database().ref('/adressesList').push(newadresses).key;
    newadresses.id = newadressesId;
    firebase.database().ref('/adressesList/' + newadressesId).set(newadresses);
    // const newadresseOrder = firebase.database().ref('/adressesList').push(newadresses.order);
    // newadresses.order = newadresseOrder;
  }

  getadressesList() {
    firebase.database().ref('/adressesList')
      .on('value', (data: Datasnapshot) => {
        this.adress = data.val()
          ? Object.values(data.val()).map(adresse => new Adress(adresse))
          : [];
      });
  }
  updateadressesList(adresse: Adress) {
    firebase.database().ref('/adressesList/' + adresse.id).update(serialize(adresse));
  }
  removeadressesList(adresse: Adress) {
    const adresseIndexToRemove = this.adress.indexOf(adresse);
    firebase.database().ref('/adressesList/' + adresse.id).remove().then(() => {
      this.adress.splice(adresseIndexToRemove, 0);
    }, console.log);
  }
}
