import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Record } from '../core/record.model';
import { RecordService, SearchFilter } from '../shared/service/record.service';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

// Dialog Components
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

//define the constant url we would be uploading to.
const URL = 'http://localhost:3000/api/portal/file/upload';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})

export class PortalComponent implements OnInit {

  public records: Observable<Array<Record>>;
  public model: Record;

  public searchParam: string;             // placeholder for the returned user search input

  public currentRecord: string;

  private submitted: boolean = false;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'csvfile' });

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private recordService: RecordService,
    private dialog: MatDialog,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    // obtain dataset
    this.records = this.getAllRecords();

    this.model = new Record({});

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //console.log("ImageUpload:uploaded:", item, status, response);
      this.recordService.importCsv().subscribe(record => this.records = this.getAllRecords());
    };
  }

  //the function which handles the file upload without using a plugin.
  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#csvfile');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'csvfile' with the first file in the element
      formData.append('csvfile', inputEl.files.item(0));
      //call the angular http method

    }
  }

  openAreYouSureDialog(id: string): void {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      data: { id: id }
    });

    dialog.afterClosed()
      .subscribe(record => this.records = this.getAllRecords());
  }

  onSubmit(newForm: NgForm): void {
    //
    this.submitted = true;
    this.currentRecord = JSON.stringify(this.model);
    //submit new record to database
    this.saveRecord(this.model);
    //
    newForm.reset();
  }

  getAllRecords(): Observable<Array<Record>> {
    //
    this.recordService.getAllRecords().subscribe(record => this.records = record);

    return this.records;
  }

  getRecordBySearchParam(search: string): Observable<Array<Record>> {
    //
    this.recordService.getRecordBySearchParam(search).subscribe(record => this.records = record);

    return this.records;
  }

  getRecordById(id: string): Record {
    //
    this.recordService.getRecordById(id).subscribe(record => this.model = new Record(record));

    return this.model;
  }

  saveRecord(record: Record): Observable<Array<Record>> {

    if (record._id == null) {
      //
      this.recordService.createRecord(record).subscribe(record => this.records = this.getAllRecords());
    } else {
      //
      console.log('this is an update');
      this.recordService.updateRecord(record).subscribe(record => this.records = this.getAllRecords());
    }

    return this.records;
  }
}