import { AdressService } from './../../../services/adress.service';
import { Post } from './../../../models/post.model';
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { computed, observable } from 'mobx-angular';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() theme: Theme;

  @Input() post: Post;
  @observable keyWordsPostValue: string;
  @observable titlePostValue: string;
  constructor(
    public postService: PostService,
    public adressService: AdressService) { }
  ngOnInit() { }

  @computed get themeFilter() {
    return this.postService.themeFilter;
  }
  @computed get allKeyWords() {
    if (this.postService.getFilteredPosts) {
      return this.postService.getFilteredPosts.reduce((acc, post) => {
        return acc.concat(
          post.keyWords.filter(k => {
            return acc.every(key => key.name.toLowerCase() !== k.name.toLowerCase());
          })
        );
      }, []);
    }
  }

  searchKeyWords(event) {
    this.postService.keyWordsFilter = event.target.value;
  }
  selectKeyWords(keyWord: string) {
    this.postService.keyWordsFilter = keyWord;
  }
  @computed get postsTitleAutocomplete() {
    if (this.postService.getFilteredPosts) {
      return this.postService.getFilteredPosts.filter(post => {
        if (this.titlePostValue) {
          return post.titre.toLowerCase().includes(this.titlePostValue.toLowerCase());
        } else {
          return true;
        }
      });
    }
  }

  @computed get anyFilterSet() {
    if (this.postService.titreFilter || this.postService.keyWordsFilter || this.postService.themeFilter) {
      return true;
    } else {
      return false;
    }
  }
  searchTitle(event) {
    this.titlePostValue = event.target.value;
  }

  selectTitle(titre: string) {
    this.postService.titreFilter = titre;
  }
  resetFilter(event) {
    event.stopPropagation();
    this.postService.keyWordsFilter = '';
    console.log('this.postService.keyWordsFilter', this.postService.keyWordsFilter);
  }

  resetTitleFilter(event) {
    event.stopPropagation();
    this.postService.titreFilter = '';
    console.log('this.postService.titreFilter', this.postService.titreFilter);
  }

  resetThemeFilter(event) {
    event.stopPropagation();
    this.postService.themeFilter = '';
  }
  resetAllFilters(event) {
    this.resetFilter(event);
    this.resetTitleFilter(event);
    this.resetThemeFilter(event);
  }
}
