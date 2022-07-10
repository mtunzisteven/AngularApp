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

  sub: Subscription;

  constructor(
    private http: HttpClient,
    private postService: PostsService
  ) {}

  ngOnInit() {

    this.sub = this.postService.error.subscribe(
      (error)=>{
        this.error = error;
      }
    );

    // update fetched posts
    this.sub = this.postService.postsUpdated.subscribe(
      (posts: Post[]) =>{
        this.loadedPosts = posts;
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
    this.sub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);

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

  onDelete(id: string){

    this.postService.deletePost(id);

  }

  onUpdate(post: Post){
    this.postService.updatePost(post);
  }

}
