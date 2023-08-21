import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{
bookForm:FormGroup;
constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudService:CrudService){
  this.bookForm = this.formBuilder.group({
    name:[''],
    price:[''],
    description:['']
})
}
ngOnInit() {
 
}
onSubmit(): void {
  this.crudService.AddBook(this.bookForm.value).pipe(
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
}
