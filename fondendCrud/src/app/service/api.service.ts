import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
    addproduct(productData:any){
    return this.http.post('http://localhost:3000/admin/addproduct',productData)
   }
   getproduct(){
    return this.http.get('http://localhost:3000/admin/addproduct')
   }
  updateProduct(id:any,data:any){  
    return this.http.put('http://localhost:3000/admin/updateproduct/'+id,data)
}
deleteProduct(id:any){
  return this.http.delete('http://localhost:3000/admin/deleteproduct/'+id)
}
}
