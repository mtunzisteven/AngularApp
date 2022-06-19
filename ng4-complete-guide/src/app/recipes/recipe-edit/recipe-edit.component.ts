import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;

  // The form
  recipeForm: FormGroup;

  // create an instance of formArray
  recipeIngredients = new FormArray([]);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
    ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null; // Will return false when the id is not set. eg: path is 'new' 

          // call our form init fn whenever the params change
          this.initForm();
        }
      );

  }

  // Reactive form method
  private initForm(){

    // Declare variables that will hold form control values
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    // If we are in edit mode, we'll want to prepopulate the form 
    // with the form control values of the recipe we're editing
    if(this.editMode){

      // get the recipe we're editing from the recipe service
      // using the id we've initialized already in the subscription.
      let recipe = this.recipeService.getRecipe(this.id);

      // Assign the values of the recipe we're editing to 
      // the variables we've assigned to hold form control values
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // we check if the recipe we added has ingredients and add them if that is the case
      if(recipe['ingredients']){

        console.log('Inside recipe ingredients');

        // go through each ingredient in the recipe
        recipe.ingredients.forEach(ingredient=>{
          
          // create a new form group and inside it create new form controls named: name and amount
          // add the value of each ingredient name and amount to the form controls create
          this.recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                                                              Validators.required,
                                                              Validators.pattern(/^[1-9]+[0-9]*$/) // positive numbers only
                                                            ]
                )
            })
          );
        });

      }

    }

    // assign the empty or prepopulated values of the recipe form
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': this.recipeIngredients
    });

  }

  // the ngSubmit listener
  onSubmit(){

    // create new recipe Obj using values of the the form user submitted
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    //   ) since the format of the form and that of the recipe model are the dame, we don't need to do this above

    if(this.editMode){
      console.log(this.recipeForm);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      // console.log(this.recipeForm.value['ingredients']);

      // Navigate one level up, relative to recipe
      this.router.navigate(['../'], {relativeTo: this.route});

    }else{
      this.recipeService.addRecipe(this.recipeForm.value);

      // Already in recipe/id/edit. navigating to recipe/id will yield: 
      // recipe/NAN because id not retrieved for new recipe
      // We must navigate to recipes page
      this.router.navigate(['recipes/']);
    }
  }

  // cancel editing a recipe
  onCancel(){
    // Navigate one level up, relative to recipe
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // We add a new array of empty ingredients input(form controls)
  onAddIngredient(){

    // create a form control seperately
    let fc = new FormGroup({
              'name': new FormControl(null, Validators.required),
              'amount': new FormControl(null,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) // positive numbers only
              ])
            });

    // Set the parent of the form control to match that of all controls 
    // in the same form array to avoid any errors when exchanging data
    fc.setParent(this.recipeIngredients);

    // add the form control to the form array of similar form controls
    // Here we're adding the form control programmatically, we're not
    // simply dealing with this.recipeForm, but 
    //
    // are using it           --> 'this.recipeForm' 
    // to load form controls  --> '.get('ingredients')['controls']'
    // through it             --> 'push(fc)'
    //
    // elements with set attribute onto the form in the html template
    this.recipeForm.get('ingredients')['controls'].push(fc);

  }

  onDeleteIngredient(index: number){


    // remove the array item(formGroup) from the form array within the form in the ts file
    // must remember that in reactive form design memthod, we're constantly dealing 
    // with the form programmatically based on the form we created programatically:
    //                                            ----> this.recipeForm.value[formcontrol]
    this.recipeForm.value['ingredients'].splice(index, 1); 

    // remove the array item(formGroup) from the form array within the form in the html file
    this.recipeForm.get('ingredients')['controls'].splice(index, 1);

    // update the recipe with the new form colntrols
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);

  }

  // An outsourced way to get controls instead of doing it inside html template which doesn't understand ts
  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
