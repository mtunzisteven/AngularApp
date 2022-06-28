import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {

    let searchResult: Contact[] = [];

    if(term && term.length > 0){

      searchResult = contacts.filter(
          (contact:Contact) =>contact.name.toLocaleLowerCase().includes(term.toLowerCase())
        );
        
    }

    if(searchResult.length != 0){
      return searchResult;
    }else{
      return contacts;
    }
  }

}
