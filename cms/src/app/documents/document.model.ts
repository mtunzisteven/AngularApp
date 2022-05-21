// Shorter TS way of defining a document class
export class Document{

    constructor(
        public id: string, 
        public name: string, 
        public description: string, 
        public url: string, 
        public children: string | null 
    ){}
} 


/**
 * id—the document id

    name—the name of the document

    description —a brief description of the document

    url—the URL of where the file is located

    children—a list of document objects that are related to the current document
 */