import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // Forbidden usernames that we'll validate for
  forbiddenUsernames = ['Mtunzi', 'Steven'];

  // forbidden name and email entered by user
  forbiddeName: string;

  // this holds values that will be used in radio buttons
  genders = ['male', 'female']; 

  // signupForm FormGroup type is simply a group of form controls
  signupForm: FormGroup;

  ngOnInit(): void {

    // form must be initialized before it can be rendered in the template
    this.signupForm = new FormGroup({
      // nested formgroup
      'userData': new FormGroup({
        // FormControl(defaultVal, Validation, )  
        // Pass ref to required fn."Validations.required" Angular will call it itself.
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), // one Angular validator with custom validator | 'this' not used inside the validator fn, bind(this) not needed
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), // multiple validators with custom asynchronous validator | 'this' not used inside the validator fn, bind(this) not needed
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // We can subscribe to value changes and vue them on the console with this code
    // Can be used on individual controls as well
    // this.signupForm.valueChanges.subscribe(
    //   (value)=>{
    //     console.log(value);
    //   }
    // );

    // We can subscribe to status changes and vue them on the console with this code
    // Can be used on individual controls as well
    this.signupForm.statusChanges.subscribe(
      (status)=>{
        console.log(status); 
      }
    );

    // setting default initial values using setValue() function
    this.signupForm.setValue({
     'userData':{
      'username': 'Imani Girl',
      'email': 'st.vuma@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    // setting default initial values using setValue() function
    this.signupForm.patchValue({'userData':{'username': 'Milani Princess'}});

  }

  onSubmit(){
    console.log(this.signupForm);
    // this.signupForm.reset(); this reset deprives custom error.
  }

  onAddHobbies(){

    // declare and initialize a form control to push into FormArray
    const control = new FormControl(null, Validators.required);

    // Inside hte parenthesis we must cast the type of this.signupForm.get('hobbies') to a FormArray or error occurs
    // The returned array is initialized in ngOnInit() and we use push method to add a new form control
    // The name of each item in the FormArray will be its index in the array.
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // We use this function to outsource the fetching of hobbies FormArray in the template using *ngFor
  // In the past, we could have used '*ngFor="let hobbyControls of signupForm.get('hobbies')).controls'
  // This no longer works, as '.controls' is not understood by Angular outside of the ts file.
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // custom validator function we'll use to check whether a user entered forbidden usernames, as defined above
  // It will be executed automatiaclly by Angular, when it checks the validity of the form control
  // The form will take a form control as an arg and return an obj with any string key with a value of a boolean
  forbiddenNames(control: FormControl): {[s:string]:boolean}{

    // If the value of the control is found in the forbiddenUsers array, the test below will be true
    if(this.forbiddenUsernames.indexOf(control.value) != -1){

      this.forbiddeName = this.forbiddenUsernames[this.forbiddenUsernames.indexOf(control.value)];

      // the key in the obj below is our short custom error code
      return {'nameIsForbidden': true};

    }

    // we pass null when the form control ios valid
    return null;
  }

  // This is a custom asynchronous validation fn
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{

    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{

        // if value entered by user is the email specified create error and its message
        if(control.value === 'mtunzism@byui.edu'){

          resolve({'emailIsForbidden': true}); // we don't return in a promise, we resolve
        }else{
          resolve(null);
        }
      }, 1500); // wait for 1,5 minutes then execute code inside curly braces
    });

    // returning the promise defined above
    return promise;
  }
}
