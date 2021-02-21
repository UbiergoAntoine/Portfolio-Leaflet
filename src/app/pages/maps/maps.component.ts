import { PostService } from './../../services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { computed, observable } from 'mobx-angular';
import { Post } from 'src/app/models/post.model';
import { Theme } from 'src/app/models/theme.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdressService } from 'src/app/services/adress.service';
import { Adress } from 'src/app/models/adress.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  adresse: any;
  @observable date: Date;
  @observable adresseId: string;
  @observable currentAdresse: string;
  @Input() theme: Theme;
  @observable themes: Theme[] = [];
  @Input() post: Post;
  @observable darkMode;
  constructor(
    public adressService: AdressService,
    private route: ActivatedRoute,
    public postService: PostService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.adresseId = params.id;
    });
  }
  @computed get firstPost() {
    return this.postService.getFilteredPosts[0];
  }
  @computed get secondPost() {
    return this.postService.getFilteredPosts[1];
  }
  @computed get thirdPost() {
    return this.postService.getFilteredPosts[2];
  }
  @computed get otherPosts() {
    return this.postService.getFilteredPosts.slice(3);
  }

  @computed get postsWhithoutTheme() {
    return this.postService.postsWhithoutTheme;
  }
  onDeleteadresse(adresse: Adress) {
    this.adressService.removeadressesList(adresse);
  }
  onSelectAdresse(adresse) {
    this.adressService.currentAdress = adresse;
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

  ngForTrackByFn(index, item) {
    return item.id;
  }

}
