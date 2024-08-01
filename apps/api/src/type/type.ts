import { BaseModel } from '@imax/datakit';

export enum TypeIdentifier {
  Applicant = 'Applicant',
  Application = 'Application',
  Manager = 'Manager',
  Document = 'Document',
  Attachment = 'Attachment',
  User = 'User',
  Requisition = 'Requisition',
  Advert = 'Advert',
  Address = 'Address',
  Education = 'Education',
  Experience = 'Experience',
  Contact = 'Contact',
  Notification = 'Notification',
  Question = 'Question',
  Answer = 'Answer',
  Position = 'Position',
  Interview = 'Interview',
  Shortlist = 'Shortlist',
  InterviewPackage = 'InterviewPackage',
  Score = 'Score',
  Offer = 'Offer',

}

export class Type extends BaseModel {
  static tableName = 'type';

  id: string;
  identifier: TypeIdentifier;
}
