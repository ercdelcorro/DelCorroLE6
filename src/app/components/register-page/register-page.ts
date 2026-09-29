import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage implements OnInit {

  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {

    const {
      username,
      password,
      firstName,
      lastName
    } = this.form;

    console.log(this.form);

    this.http.post(
      'https://localhost:7162/api/Login/register',
      {
        UserName: username,
        Password: password,
        FirstName: firstName,
        LastName: lastName
      },
      {
        responseType: 'text'
      }
    ).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.log(error);
      }
    });
  }
}