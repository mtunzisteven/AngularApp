import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // user object will hold the data entered by the user, and will be updated on submit
  user = {
    username:'',
    email:'',
    secretQuestion:'',
    answer:'',
    gender:''
  };

  // variable that will help us monitor that the form has indeed been submitted
  formSubmitted = false;

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

    this.formSubmitted = true;

    //---------------------------------------------------------userData group values
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    //---------------------------------------------------------userData group end
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.answer;
    this.user.gender = this.signupForm.value.gender;

    // this line will simply clear all values, states, and validity of the form set by th euser and Angular
    this.signupForm.reset();

  }
}
