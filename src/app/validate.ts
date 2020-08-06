import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class UsernameValidator {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if(control.value <= 0){
            return {cannotContainSpace: true}
        }
  
        return null;
    }
}