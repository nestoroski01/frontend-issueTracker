import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from '../shared/services/issue.service';
import { Issue, IssueWithDetails } from '../shared/models/issue.class';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { Severity } from '../shared/models/severity.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Status } from '../shared/models/status.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Array<IssueWithDetails>;
  filterForm: FormGroup;
  filteredValues: BehaviorSubject<any> = new BehaviorSubject({
    severity: '',
    status: ''
  });

  constructor(private issueService: IssueService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getIssues();

    this.filterForm = this.formBuilder.group({
      severityFilter: '',
      statusFilter: ''
    })
  }

  getIssues(): void {
    this.issueService.getIssuesWithDetails().subscribe((issues: IssueWithDetails[]) => {
      this.issues = issues;
    }, err => {
      console.log('Error getting issues')
    });
  }

  navigateToEditComponent(id: String): void {
    this.router.navigate([`/update/${id}`]);
  }

  deleteIssue(id: String): void {
    this.issueService.deleteIssue(id).subscribe(res => {
      this.getIssues();
    })
  }

  filterIssues(): void {
    this.filteredValues.next({
      severity: this.filterForm.get('severityFilter').value,
      status: this.filterForm.get('statusFilter').value
    })
  }

  resetFilters(): void {
    this.filterForm.get('severityFilter').setValue('');
    this.filterForm.get('statusFilter').setValue('');

    this.filterIssues();
  }

}
