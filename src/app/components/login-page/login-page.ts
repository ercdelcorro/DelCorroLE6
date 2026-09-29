import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { TokenStorageService } from '../../services/token-storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit(): void {

    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data: string) => {

        this.tokenStorage.saveToken(data);

        this.authService.isLoggedIn = true;

        this.router.navigate([this.authService.redirectUrl]);

        window.location.reload();
      },

      error: (error) => {
        console.log(error);
      }
    });
  }
}