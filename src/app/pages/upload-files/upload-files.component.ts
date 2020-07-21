import { Component, OnInit } from '@angular/core';
import ImageSnippet from 'src/app/models/entities/file.model';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  types: string[] = ['customer', 'establishment', 'class', 'category', 'sub_category', 'sub_sub_category', 'product_template'];
  selectedFile: ImageSnippet;
  entity: any = {
    entity_id: 0,
    entity: 'customer'
  }

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  procesfile(imgageInput: any) {
    let file: File = imgageInput.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    })

    reader.readAsDataURL(file);

  }
  saveimage() {
    this.userService.uploadPhoto(this.selectedFile.file, this.entity.entity_id, this.entity.entity).subscribe((res: any) => {
      if (res.success) {
        this.entity = {
          entity_id: 0,
          entity: 'customer'
        }
        this.selectedFile = null;
        this._snackBar.open('La imagen se ha subido Exitosament', 'cerrar', { duration: 2000 });
      }
    }, (err: any) => {
      console.log(err)
    })
  }

}
