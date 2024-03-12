import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../../auth/services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
  RecordPreviewDialogComponent
} from "../../../records/components/record-preview-dialog/record-preview-dialog.component";
import {RecordsService} from "../../../records/service/records.service";

@Component({
  selector: 'app-toolbar',
  host: {
    class: 'toolbar-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, NgOptimizedImage, MatIconModule, ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnDestroy {
  public minute: string = '';
  public hour: any;
  public currentDate: Date = new Date();
  me: UserDto = new UserDto();
  timer: any;
  searchCtrl: FormControl = new FormControl<string>('')
  form: FormGroup = new FormGroup<any>({})
  disabled: boolean = false;

  constructor(private dialog: MatDialog,private recordsService: RecordsService, _userService: UserService, private changeDetectorRef: ChangeDetectorRef, private _snackBar: MatSnackBar) {

    _userService.updateImage.subscribe((response) =>{
      if(response) {
        this.me.image = response;
      }
    })
    this.searchCtrl = new FormControl('', [Validators.pattern("[0-9]{13}")])
    this.changeDetectorRef.detach();
    this.currentDate = new Date();
    this.updateDate();
    this.timer = setInterval(() => {
      this.currentDate = new Date();
      this.updateDate();
      this.changeDetectorRef.detectChanges();
    }, 1000);
    _userService.me().subscribe({
      next: (user) => {
        this.me = user;
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }


  private updateDate() {
    const hours = this.currentDate.getHours();
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = this.currentDate.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
  }

  onSearch() {
    if(this.searchCtrl.invalid){
      this._snackBar.open("You can only search by personal identification number, that has 13 numbers!");
    }else{
      this.disabled = true;
      this.recordsService.findRecordWithPersonalId(this.searchCtrl.value).subscribe({
        next: (response) =>{
          this.disabled = false;
          console.log(response)
          this.searchCtrl.setValue('');
          this.dialog.open(RecordPreviewDialogComponent, {
            minWidth: "40vw",
            data:{
              record: response
            }
          });
        },
        error:(err) =>{
          this.disabled = false;
          console.log(err)
        }
      })
    }
  }
}
