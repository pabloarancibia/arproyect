import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  nombreusuario: string;
  password: string;

  public errorMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombreusuario: ['',[Validators.required]],
      password: ['',[Validators.required]],

    })
  }

  private buildForm(): void {
    
  }

  signIn() {
    //console.log('test login 1',this.loginForm);
    //this.router.navigate(['/home']);
    // if (this.loginForm.valid) {
      //console.log('test login 2')
      const data = this.loginForm.value;
      this.authService.signIn(data)
        .subscribe(
          res => {
            //console.log(res);
            this.router.navigate(['/home']);
          }
        )
    // }
  }

}
