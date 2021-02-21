import { Theme } from './../models/theme.model';
import { Injectable } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
import { autorun } from 'mobx';
@Injectable()
export class ThemeService {
  @observable themes: Theme[] = [];
  @observable themeFilter: string;
  @observable keyWordsFilter: string;
  @observable titreFilter: string;

  constructor(
  ) {
    this.fetchThemes();
    autorun(() => {
      console.log(this.themeFilter);
    });
  }
  fetchThemes() {
    firebase.database().ref('/themes')
      .on('value', (data: Datasnapshot) => {
        this.themes = data.val()
          ? Object.values(data.val()).map(theme => new Theme(theme))
          : [];
      });
  }
  getSingleTheme(id: string) {
    if (this.themes) {
      return this.themes.find((theme) => {
        return theme.id === id;
      });
    }
  }
  createNewTheme(newTheme: Theme) {
    this.themes.push(newTheme);
    const newThemeId = firebase.database().ref('/themes').push(newTheme).key;
    newTheme.id = newThemeId;
    firebase.database().ref('/themes/' + newThemeId).set(newTheme);
  }
  updateTheme(theme: Theme) {
    firebase.database().ref('/themes/' + theme.id).update(serialize(theme));
  }
  removeTheme(theme: Theme) {
    if (confirm('Supprimer le theme ?')) {
      const themeIndexToRemove = this.themes.findIndex(
        (themeId) => {
          if (themeId === theme) {
            return true;
          }
        }
      );
      firebase.database().ref('/themes/' + theme.id).remove();
      this.themes.splice(themeIndexToRemove, 1);
    } else {
      alert('Le theme n\'a pas été supprimé');
    }
  }
}
