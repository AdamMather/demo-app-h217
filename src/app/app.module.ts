import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from './portal/portal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { AlertModule } from 'ngx-bootstrap';
//import the ng2-file-upload directive so we can add it to our declarations.
import { FileSelectDirective } from 'ng2-file-upload';

// Routes
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';

// Dialog Components
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

// Services
import { RecordService } from './shared/service/record.service';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    DeleteDialogComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    PortalModule,
  ],
  providers: [
    RecordService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
