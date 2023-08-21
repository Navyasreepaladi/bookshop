import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { from, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
  getId:any;
  updateForm!: FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private crudApi:CrudService){
this.getId = this.activatedRoute.snapshot.paramMap.get('id');
this.crudApi.getBook(this.getId).subscribe(res=>{
  this.updateForm.setValue({
    name: res['name'],
    price :res['price'],
    description: res['description']
  })
});
this.updateForm= this.formBuilder.group({
  name:[''],
  price:[''],
  description:['']
})
  }
  ngOnInit():void{}
    // onUpdate(){
    //   this.crudApi.updateBook(this.getId,this.updateForm.value).subscribe(res=>{
    //     console.log("Data updated succesful");
    //     this.ngZone.run(()=>{this.router.navigateByUrl('/books-list')})
    //   },(err)=>{
    //     console.log(err)
    //   })
    // }
    onUpdate(): void {
      this.crudApi.updateBook(this.getId, this.updateForm.value).pipe(
        tap(() => {
          console.log('Data Added Successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        }),
        catchError((err: any) => {
          console.error(err);
          return of(null); // Return an observable to handle the error
        })
      ).subscribe();
    }
    
  
    // onUpdate() {
    //   this.crudApi.updateBook(this.getId, this.updateForm.value).subscribe(
    //     () => {
    //       console.log("Data updated successful");
    //       this.ngZone.run(() => { this.router.navigateByUrl('/books-list') });
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }
    
    
    
  }



