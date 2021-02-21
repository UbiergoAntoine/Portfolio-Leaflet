import { PostService } from './../../services/post.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { computed, observable } from 'mobx-angular';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemePageComponent } from 'src/app/pages/theme-page/theme-page.component';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {
  themesListForm: FormGroup;
  @observable themeId: string;

  @observable theme: Theme;
  constructor(
    private route: ActivatedRoute,
    public themeService: ThemeService,
    public postService: PostService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ThemePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.themeId = params.id;
    });
  }
  @computed get allThemes() {
    return this.themeService.themes;
  }
  initForm() {
    this.themesListForm = this.formBuilder.group({
      name: ['', Validators.required],
      order: -1
    });
  }
  saveThemesList() {
    const newTheme = new Theme({
      name: this.themesListForm.get('name').value,
      icon: (this.themesListForm.get('name').value.charAt(0).toUpperCase() + this.themesListForm.get('name').value.charAt(1).toUpperCase())
    });
    this.themeService.createNewTheme(newTheme);
    this.themesListForm.reset();
  }
  onEnter(theme: string) {
    this.theme.name = theme;
    this.saveThemesList();
    this.themesListForm.reset();
  }
  deleteTheme(theme: Theme) {
    this.themeService.removeTheme(theme);
  }

}
