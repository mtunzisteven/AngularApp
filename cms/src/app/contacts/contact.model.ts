export class Contact{

    // Shorter TS way of defining a contact class
    constructor(
        public id: string, 
        public name: string, 
        public email: string, 
        public phone: string, 
        public imageUrl: string, 
        public group: string | null
    ){}
} 