import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  user:string;
  constructor(private loginService:LoginService,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    ) { }

  ngOnInit(): void {
  }

  forgotpassword(){
    this.loginService.forgetpassword(this.user).subscribe((res:any)=>{
      this.dialogRef.close();
    },()=>{
      this.dialogRef.close()
    })
  }

}
