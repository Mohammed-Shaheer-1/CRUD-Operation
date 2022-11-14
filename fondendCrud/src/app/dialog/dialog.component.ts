import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  fresherList: any = ['Brand New', 'Second Hand', 'RefurBished']
  productForm !: FormGroup
  //  @Input() id:any | undefined


  editmode: boolean = false

  constructor(private fb: FormBuilder, private service: ApiService, private dialogref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]

    })



  }
  addProduct() {

    this.editmode=JSON.parse(localStorage.getItem("status")||"")
    console.log("this",this.editmode);
    
    if(this.editmode){
      window.location.reload()
      let id = JSON.parse(localStorage.getItem('id') || "")
      console.log("idd", id);
      localStorage.setItem("status", JSON.stringify(false))
      this.service.updateProduct(id, this.productForm.value).subscribe((result: any) => {
        console.log("resul", result);
      
        this.productForm.reset()
      
      
      }, (result: any) => {
        console.log("result", result);
  
      })
    }else{
      this.editmode=false
          // console.log(this.item);
    window.location.reload()
    this.service.addproduct(this.productForm.value).subscribe((result: any) => {
      alert("product Added")
      console.log("success", result);
      this.productForm.reset()
      this.dialogref.close('save')
    }, (result: any) => {
      console.log("err", result);

    })
    }


  }

  updateProduct() {

  }

}
