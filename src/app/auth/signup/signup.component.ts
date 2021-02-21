import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string; // Envoyé par Fb  constructor() { }

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) { }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({

      // Validator oblige un string au format email

      email: ['', [Validators.required, Validators.email]],

      // Validator oblige au moins 6caractères alphanumériques (minimum pour FB) avec une REGEX {6,}!

      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    // On envoie les valeurs rentrées par l'utili à la méthode createNewUser

    this.authService.createNewUser(email, password).then(
      () => {

        // Si la création d'un nouveau compte fonctionne, root vers /posts

        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error; // Sinon, message d'erreur envoyé par FB
      }
    );
  }
}
