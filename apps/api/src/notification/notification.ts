import { BaseModel } from '@imax/datakit';
import Objection from 'objection';
import { Context } from '~/context';
import { TypeIdentifier } from '~/type';

export enum NotificationCategory {
  General = 'General',
  Application = 'Application',
  Document = 'Document',
  UserAccount = 'UserAccount',
  Requisition = 'Requisition',
  Interview = 'Interview',
  Advert = 'Advert',

}

export enum NotificationMessage { 
  NewApplication = 'Your application has been submitted',
  NewRequisition = 'New requisition has been created',
  UpdateAdvert = 'Job has been updated',
  UpdateRequisition = 'Requisition has been updated',
  RejectRequisition = 'Requisition has been rejected',
  ApproveRequisition = 'Requisition has been approved',
  RejectApplication = 'We regrettably inform you that your application was unsuccessful.',
  SuccessfulApplication = 'We are delighted to inform you that your application has been successful! Congratulations',
  CandidateShortlisted = 'A new candidate has been added to shortlist',
  NewInterView = "We would like to invite you for an interview. Please check your email for details",
  CompleteInterview = "Your interview has been completed. Please check your email for details",
  PublishAdvert = "A job publication has been made for the requisition you created",
 
  
}

export enum NotificationTitle {
  NewApplication = "New Application",
  UpdatedApplication = "Updated Application",
  NewAdvert = "New Advert",
  UpdateAdvert = 'Job Updated',
  NewRequisition = "New Requisition",
  UpdateRequisition = "Requisition Updated",
  ApproveRequisition = "Requisition Approved",
  RejectRequisition = "Requisition Rejected",
  JobPublished = "Job Published",
  JobUpdated = "Job Updated",
  NewInterView= 'Interview invitation',
  CandidateShortlisted = "Candidate Shortlisted",
  ApproveApplication = "Application Approved",
  RejectApplication = "Application Rejected",
  CompleteInterview = "Interview Completed",
  PublishAdvert = "Advert Published",
}

export enum NotificationStatus {
  New = 'New',
  Seen = 'Seen',
}

export class Notification extends BaseModel {
  static tableName = 'notification';
  static typeIdentifier = TypeIdentifier.Notification;

  id: string;
  userId: string;
  refId: string;
  category: NotificationCategory;
  title: string;
  message: string;
  status: NotificationStatus;
  createdAt: Date;


  static applySearch(
    query: Objection.QueryBuilder<Notification, Notification[]>,
    db: Context['db'],
    text?: string | null,
  ) {
    if (text) {
      const rank = `ts_rank(search, websearch_to_tsquery('simple', ?))`;
      query
        .select(db.raw(`*, ${rank} as rank`, text))
        .whereRaw(`search @@ websearch_to_tsquery('simple', ?)`, text)
        .andWhereRaw(`${rank} > 0`, text)
        .orderBy('rank', 'desc');
    } else {
      query.select('*');
    }
  }


}
