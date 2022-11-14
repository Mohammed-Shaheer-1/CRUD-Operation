import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fondendCrud';
  product: any
  istrue: any
  productid: any
  fresherList: any = ['Brand New', 'Second Hand', 'RefurBished']
  productForm !: FormGroup
  searchvalue:any=''
  constructor(private dialog: MatDialog, private service: ApiService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getAllproduct()
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]

    })


 
  }


  openDialog() {
    this.dialog.open(DialogComponent, {

      width: '30%'
    });
  }
  open(id: any) {
    this.dialog.open(DialogComponent, {

      width: '30%'
    });
    this.productid = id
    localStorage.setItem("status", JSON.stringify(true))
    localStorage.setItem("id", JSON.stringify(this.productid))



  }


  getAllproduct() {

    this.service.getproduct().subscribe((result: any) => {
      console.log("GET", result);
      this.product = result

    }, (result: any) => {
      console.log("err", result);
      window.location.reload()
    })
  }
  onEdit(id: any) {
    this.istrue = id
  }
  deleteProduct(id: any, product: any) {
    window.location.reload()
    localStorage.removeItem('id')
    localStorage.removeItem('status')

    alert(`are you want to delete ${product}`)
    this.service.deleteProduct(id).subscribe((res: any) => {
      console.log("res", res);

    }, (err: any) => {
      console.log("errDelete", err);

    })
  }
  applyFilter(event: Event) {
     console.log(event);
     this.searchvalue=event
     
  }
}
