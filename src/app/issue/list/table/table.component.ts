import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IssueWithDetails } from '../../shared/models/issue.class';
import { MatTableDataSource, MatTable, MatSort, MatSortable } from '@angular/material';
import { Severity } from '../../shared/models/severity.enum';
import { Status } from '../../shared/models/status.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() issuesData: Array<IssueWithDetails>;
  @Input() filteredValues: BehaviorSubject<any>;

  @Output() deleteIssueEvent = new EventEmitter();
  @Output() navigateToEditEvent = new EventEmitter();

  @ViewChild(MatTable) table: MatTable<IssueWithDetails>;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  issuesMatTableDataSource: MatTableDataSource<IssueWithDetails> = new MatTableDataSource<IssueWithDetails>();
  severityType = Severity;
  statusType = Status;

  constructor() { }

  ngOnInit() {
    this.initializeIssuesMatTableDataSource();
    this.filteredValues.subscribe(filteredValues => {
      this.issuesMatTableDataSource.filter = JSON.stringify(filteredValues);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['issuesData']) {
      this.initializeIssuesMatTableDataSource();
    }
  }

  initializeIssuesMatTableDataSource(): void {
    this.issuesMatTableDataSource.data = this.issuesData;
    this.issuesMatTableDataSource.sort = this.sort;
    this.issuesMatTableDataSource.filterPredicate = this.setFilterPredictate();

    // initial issues sort active
    this.sort.sort(<MatSortable>{
      id: 'severity',
      start: 'desc'
    }
    );
  }

  setFilterPredictate() {
    return (data: IssueWithDetails, filter: string) => {
      let searchString = JSON.parse(filter)
      return data.severity.toString().indexOf(searchString.severity) !== -1
        && data.status.toString().indexOf(searchString.status) !== -1
    }
  }

  deleteIssue(id: string) {
    this.deleteIssueEvent.emit(id);
  }

  navigateToEditComponent(id: string) {
    this.navigateToEditEvent.emit(id);
  }

}
