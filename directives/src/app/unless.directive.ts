import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // The method will set a property every time the condition(arg) is false
  // The name of the method that sets the property needs to match the directive selector name
  @Input() set appUnless(condition: boolean){

    // When the condition changes(!condition), a view is created in the view container
    // The view is the templateRef we declare in the constructor. If the condition is 
    // not satisfied, we simply clear the view in the view container.
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    }else{
      this.vcRef.clear();
    }
  }

  // template injected using private templateRef: TemplateRef and ViewContainerRef used to specify where it will be injected
  constructor(private templateRef:TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
