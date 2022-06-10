import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Document } from '../../document.model';
import { DocumentService } from '../../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document:Document;

  //DocumentService, Router, and ActivatedRoute
  constructor() { }

  ngOnInit(): void {

  }

}
