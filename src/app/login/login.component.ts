import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 
  router=inject(Router);
  ngOnInit(){
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false)
    });   
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      // alert("LogIn Successful");
      this.loginForm.reset();
      this.loginForm.get('name')?.setErrors(null);
      this.loginForm.get('password')?.setErrors(null);
    }
  }
  onclick(){
    alert("LogIn Successful");
    this.router.navigate(['/dash'], { queryParams: { name: this.loginForm.get('name')?.value } });
  }

  onRememberMeChange(event: any) {
    if (event.checked) {
      const name: string = this.loginForm.value.name;
      let data: { name: string }[] = JSON.parse(localStorage.getItem('names') ?? '[]');
      data.push({ name: name });
      localStorage.setItem('names', JSON.stringify(data));
    }
  }
}
