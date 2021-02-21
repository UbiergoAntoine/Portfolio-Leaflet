import { AppComponent } from './../../app.component';
import { Post } from 'src/app/models/post.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PostService } from './../../services/post.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface KeyWord {
  name: string;
}

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {
  selected = '';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  keyWords: KeyWord[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // Le reste
  post: Post;
  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(
    public postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.postForm = this.formBuilder.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      keyWords: [''],
      lien: ['', Validators.required],
      adress: ['', Validators.required],
      theme: ['', Validators.required],
      stackBlitz: ['']
    });
  }
  onSavePost() {
    const newPost = new Post({
      titre: this.postForm.get('titre').value,
      contenu: this.postForm.get('contenu').value,
      keyWords: this.keyWords,
      lien: this.postForm.get('lien').value,
      adress: this.postForm.get('adress').value,
      theme: this.postForm.get('theme').value,
      stackBlitz: this.postForm.get('stackBlitz').value,

    });
    if (this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
      console.log('newPost', newPost);
    }
    this.postService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  add(event): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.keyWords.push({ name: value.trim() });
      console.log('this.keyWords', this.keyWords);
      console.log('this.postForm.get.value', this.postForm.get('keyWords').value);
    }
    if (input) {
      input.value = '';
    }
  }

  remove(keyWord: KeyWord): void {
    const index = this.keyWords.indexOf(keyWord);

    if (index >= 0) {
      this.keyWords.splice(index, 1);
    }
  }
}
