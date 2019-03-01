import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { MaterialModule } from '../shared/material/material.module';
import { IssueService } from './shared/services/issue.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './list/table/table.component';
import { DragDropComponent } from './list/drag-drop/drag-drop.component';
import { IssueCardComponent } from './list/drag-drop/issue-card/issue-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: 'update/:id', component: CreateComponent }
    ])
  ],
  declarations: [
    ListComponent,
    CreateComponent,
    TableComponent,
    DragDropComponent,
    IssueCardComponent,
  ],
  providers: [
    IssueService
  ]
})
export class IssueModule { }
