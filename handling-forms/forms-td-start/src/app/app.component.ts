import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // the default value that is passed to the ngModel through dataa binding in the select tag
  // pet is the value of one of the option inside the select element.
  defaultValue = 'teacher';

  // This will be the value used in the ngModel two-way binding
  // This is used in the form to react to changes as they occur
  messageOutput = '';

  // genders array will be used with form buttons
  genders = ['male', 'female'];

  // accessing #f reference in the html form
  // NgForm provides a JS object created by Angular with form attributes
  @ViewChild('f') signupForm: NgForm;

  suggestUsername(){
    const suggestedName = 'Superstar';

    // Using .setValue() method overides all the values in the form
    // It is not ideal if we only want to suggest one input
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: 'mymail@gmail.com'
    //   },
    //   secret: 'pet',
    //   message: '',
    //   gender: 'male'

    // });

    // Using .form.patchValue() method does not overide all the values in the form
    // It is ideal if we only want to suggest one input | note that method avalable on signupForm.form, not signupForm
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

  }

  // onSubmit(form: NgForm){
  //   // NgForm provides a JS object created by Angular with form attributes
  //   console.log(form);
  // }

  onSubmit(){
    console.log(this.signupForm.value.email);
  }
}
