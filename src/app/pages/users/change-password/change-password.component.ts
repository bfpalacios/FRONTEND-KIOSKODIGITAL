import { Component, OnInit } from '@angular/core';
import { ChangePassword } from '../../../models/entities/password.model';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: ChangePassword = new ChangePassword;
  errors: any;
  message:string;

  constructor(
    private localStorageService: LocalStorageService,
    private userService:UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let userlogged = this.localStorageService.getInfoUserLogged();

    this.changePassword.email = userlogged.email;
    this.changePassword.userType = userlogged.type == "PROVIDER" ? "P" : "C";
  }

  save() {
    this.message = '';
    this.userService.changePassword(this.changePassword).subscribe((res:any)=>{
      if(res.success){
        this._snackBar.open('El password se ha cambiado correctamente, vuelva a iniciar sesion', 'cerrar', { duration: 2000 });
        this.router.navigate(['/login'])

      }else{
        this.message = res.message;
      }
    },
    
    (err)=>{
      if(err.status == 400){
        this.errors = err.error.fields
      }
      
    })

  }

}
