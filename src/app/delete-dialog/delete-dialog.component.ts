import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { RecordService } from '../shared/service/record.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) 
              public data: any,
              private recordService: RecordService,
              private dialog: MatDialog
            ) { }

  ngOnInit() {

  }

  dialogClose() {
    this.dialog.closeAll();
  }

  deleteRecord(id: string): void {
    //
    this.recordService.deleteRecord(id).subscribe();

    this.dialogClose();
  }

}
