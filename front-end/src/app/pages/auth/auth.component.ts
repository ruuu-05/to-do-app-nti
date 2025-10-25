import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  loading = false;
  error = '';

  // Login form
  loginUsername = '';
  loginPassword = '';

  // Signup form
  signupUsername = '';
  signupPassword = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
    this.resetForms();
  }

  resetForms() {
    this.loginUsername = '';
    this.loginPassword = '';
    this.signupUsername = '';
    this.signupPassword = '';
    this.confirmPassword = '';
  }

  login() {
    if (!this.loginUsername.trim() || !this.loginPassword.trim()) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginUsername, this.loginPassword).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        this.error = error.error?.error || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }

  signup() {
    if (!this.signupUsername.trim() || !this.signupPassword.trim()) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.signupPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.signupPassword.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signup(this.signupUsername, this.signupPassword).subscribe({
      next: () => {
        this.error = '';
        this.isLoginMode = true;
        this.resetForms();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.error || 'Signup failed. Please try again.';
        this.loading = false;
      }
    });
  }
}



