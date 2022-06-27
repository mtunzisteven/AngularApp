import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  loadedPosts = [];
  isFetching = false;
  error = null;

  errorSub: Subscription;

  constructor(
    private http: HttpClient,
    private postService: PostsService
  ) {}

  ngOnInit() {

    this.errorSub = this.postService.error.subscribe(
      (error)=>{
        this.error = error;
      }
    );

    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(

      fetchedData =>{

        this.loadedPosts = fetchedData;
        this.isFetching = false;

      }, error => {
        this.error = error;

      }
    );
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAdStorePost(postData.title, postData.content);

  }


  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(

      fetchedData =>{

        this.loadedPosts = fetchedData;
        this.isFetching = false;

      }, error => {
        this.error = error;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()      
    .subscribe(responseData => {
      this.loadedPosts = [];;
    });;
  }

  onErrorClear(){
    this.error = null;
    this.isFetching = false;

  }

}
