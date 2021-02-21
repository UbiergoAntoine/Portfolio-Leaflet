

// Les modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MobxAngularModule } from 'mobx-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialElevationDirective } from './material-elevation.directive';

// Les compos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostNewComponent } from './modals/post-new/post-new.component';
import { PostSingleComponent } from './pages/post-single/post-single.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ThemePageComponent } from './pages/theme-page/theme-page.component';
import { FiltersComponent } from './components/posts/filters/filters.component';
import { PostFormComponent } from './components/posts/post-form/post-form.component';
import { PostResumeComponent } from './components/posts/post-resume/post-resume.component';
import { BandeauComponent } from './components/posts/bandeau/bandeau.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AdressComponent } from './modals/adress/adress.component';
import { TodoComponent } from './modals/todo/todo.component';
import { ThemeFormComponent } from './modals/theme-form/theme-form.component';
import { ConfirmationDialogComponent } from './modals/confirmation-dialog/confirmation-dialog.component';

// FB
import * as firebase from 'firebase';

// Les services
import { ThemeService } from './services/theme.service';
import { AdressService } from './services/adress.service';
import { TodoService } from './services/todo.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { MapsComponent } from './pages/maps/maps.component';
import { LeafletComponent } from './components/leaflet-web-component/leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostEditComponent,
    PostSingleComponent,
    PostNewComponent,
    SignupComponent,
    SigninComponent,
    TodoComponent,
    AdressComponent,
    HomeComponent,
    MapsComponent,
    FooterComponent,
    PostCardComponent,
    BandeauComponent,
    PostResumeComponent,
    PostFormComponent,
    FiltersComponent,
    ThemePageComponent,
    ThemeComponent,
    ThemeFormComponent,
    ConfirmationDialogComponent,
    LeafletComponent,
    MaterialElevationDirective
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MobxAngularModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MarkdownModule.forRoot(),
    LeafletModule,
    LeafletMarkerClusterModule
  ],

  providers: [
    PostService,
    AuthGuardService,
    AuthService,
    TodoService,
    AdressService,
    ThemeService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AdressComponent,
    TodoComponent,
    PostNewComponent,
    ThemeFormComponent,
    ConfirmationDialogComponent,
    LeafletComponent
  ]
})
export class AppModule {
  constructor() {
    // La configuration Firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyBiVCMTCZsuZP00q3rE6wgFS351-cxC9iM',
      authDomain: 'site-perso-85dde.firebaseapp.com',
      databaseURL: 'https://site-perso-85dde.firebaseio.com',
      projectId: 'site-perso-85dde',
      storageBucket: 'site-perso-85dde.appspot.com',
      messagingSenderId: '3032690032',
      appId: '1:3032690032:web:a629f27ab4125f3b'
    };
    firebase.initializeApp(firebaseConfig);
  }
}
