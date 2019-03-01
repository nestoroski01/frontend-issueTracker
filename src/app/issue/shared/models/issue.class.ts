import { Severity } from "./severity.enum";
import { Status } from "./status.enum";
import { User } from "../../../user/shared/models/user.class";

export class Issue {
    constructor(
        public _id: String,
        public title: String,
        public reporter: String,
        public responsible: String,
        public severity: Severity,
        public status: Status,
    ) {}
}

export class IssueWithDetails extends Issue {
    constructor(
        public _id: String,
        public title: String,
        public reporter: String,
        public responsible: String,
        public severity: Severity,
        public status: Status,
        public reporterDetails: User,
        public responsibleDetails: User
    ) {
        super(_id, title, reporter, responsible, severity, status);
    }
}