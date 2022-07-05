import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  loadedPosts: Post[] = [];

  // A subject to emit errors that occur in requestws we subscribe to on this service
  // therefore we cannot use the subscription level error handling methid in onFetch()

  error = new Subject<any>();

  constructor(private http: HttpClient) { }


  createAdStorePost(title: string, content: string){

    const postData: Post = {title: title, content: content}
    
    // This Angular method will take args: API end point url and data to be sent
    // data will be converted by Angular automatically into JSON format for us
    // post returns a response, it is an obsevable. If we do not subscribe to it,
    // Angular never bothers to send the request at all. Response data will be extracted for us.
    // We specify what type of data we'll receive with the help of our model in "<>"

    this.http
    .post<{ message: string }>(
      'http://localhost:3000/api/posts', 
      postData,
      {
        observe: 'response' 
      } // Adding this arg next to postData allows us to receive full response data( with bosy included)
      )
    .subscribe(responseData => {
      console.log(responseData); // We've got access tp the full response data, therefore we can use responseData.body to use body
    }, error => {
      this.error.next(error);
    }
    
    );

    //--Post to Firebase
      // this.http
      //   .post<{ name: string }>(
      //     'https://ng-complete-guide-d897e-default-rtdb.firebaseio.com/posts.json', 
      //     postData,
      //     {
      //       observe: 'response' 
      //     } // Adding this arg next to postData allows us to receive full response data( with bosy included)
      //     )
      //   .subscribe(responseData => {
      //     console.log(responseData); // We've got access tp the full response data, therefore we can use responseData.body to use body
      //   }, error => {
      //     this.error.next(error);
      //   }
        
      //   );
    //--
  }

  fetchPosts(){

    // If we do not subscribe to it, Angular never bothers to send 
    // the request at all. Response data will be extracted for us.
    // We specify what type of data we'll receive with the help of our model in "<>"
    // We return the observble here so that we can subscribe to it in the component
    // because we wanted to monitor when the data has been fetched. An alternative method 
    // would be to use a subject to monitor the fetching of data, bit that is not necessary here.

    //---Fetched from localhost3000
      return this.http.get<Post[]>(
          "http://localhost:3000/api/posts",
          {// All requests allow us to add headers. These may be required by API we're sending request to
          // We can also use params instead of headers, depending on what the API endpoints need
            headers: new HttpHeaders({"Custom-Header":"Hello"}), 
            params: new HttpParams().set('print', 'pretty'),
            responseType: 'json' // this arg allows us to set the response type | default is json
          } 
        )

    //--- Fetched from Firebase
        // return this.http.get<{ [key: string]: Post}>(
        //   'https://ng-complete-guide-d897e-default-rtdb.firebaseio.com/posts.json',
        //   {// All requests allow us to add headers. These may be required by API we're sending request to
        //    // We can also use params instead of headers, depending on what the API endpoints need
        //     headers: new HttpHeaders({"Custom-Header":"Hello"}), 
        //     params: new HttpParams().set('print', 'pretty'),
        //     responseType: 'json' // this arg allows us to set the response type | default is json
        //   } 
        //   )
        //   .pipe(
        //     map((responseData) => {
        //     // pipe allows us to work the data before we subscribe to it.
        //     // here we're using map method to change the way the data looks

        //     const postArr: Post[] = [];

        //     // the key is the automatic key created by Firebase for each post we create
        //     // uaing the sprean operator we create a new obj
        //     for(const key in responseData){

        //       // Make sure responseData has a key
        //       if(responseData.hasOwnProperty(key)){

        //         // key becomes the id of thw post and we unload other data
        //         // into the object as the rest of the key value pairs
        //         postArr.push({...responseData[key], id: key}) ;

        //       }
        //     }

        //     return postArr;


        //   }), //
        //   catchError(errorRes => {
        //     // do your own custom actions with the function befor eyou send it to the user
        //     return throwError(errorRes);
        //   })
        // );
      //----
  }

  deletePosts(){

    // We'll return observable instead of subscribing here in order to also clear the posts
    // from browser.
    return this.http.delete('https://ng-complete-guide-d897e-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events', // Adding this arg allows us to receive full response data( with body included in the object)
        responseType: 'text' // this arg allows us to set the response type
        
      }
    ).pipe(tap(event =>{  // tap allows us to access the response and do anything to it, without changing it.
      if(event.type == HttpEventType.Sent){ // HttpEventType has access to response types that can give us info of resonse
        console.log('data deleted successfully!');
      }
    }));
  }
}
