import { KeyWord, Post } from './../../../models/post.model';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { computed } from 'mobx-angular';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() post: Post;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(public postService: PostService) { }
  ngOnInit() { }
  onUpdatePost() {
    this.postService.updatePost(this.post);
  }

  @computed get selected() {
    if (this.post.theme) {
      return this.post.theme;
    } else {
      return '';
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value && value.trim() !== '')) {
      this.post.keyWords.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }
  }
  remove(keyWord: KeyWord): void {
    const index = this.post.keyWords.indexOf(keyWord);

    if (index >= 0) {
      this.post.keyWords.splice(index, 1);
    }
  }
}
