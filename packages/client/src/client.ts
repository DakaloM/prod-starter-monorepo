import {
  ProfileDocument,
  UserFragment,
  LoginDocument,
  MutationLoginArgs,
  TokensFragment,
  MutationForgotPasswordArgs,
  ForgotPasswordDocument,
  MutationRecoverPasswordArgs,
  RecoverPasswordDocument,
  QueryUsersArgs,
  UsersDocument,
  UsersPayloadFragment,
  QueryUserArgs,
  UserDocument,
  FullUserFragment,
  CreateUserInput,
  CreateUserDocument,
  UpdateUserInput,
  UpdateUserDocument,
  UploadAttachmentInput,
  UploadAttachmentDocument,
  UploadAttachmentFragment,
  DeleteAttachmentDocument,
  UpdateAttachmentInput,
  UpdateAttachmentDocument,
  FullAttachmentFragment,
  NotificationFilter,
  NotificationsDocument,
  NotificationFragment,
  ReadAllNotificationsInput,
  ReadAllNotificationsDocument,
  DeleteAllNotificationsDocument,
  UpdateNotificationStatusDocument,
  UpdateNotificationStatusInput,


} from '@gen/graphql';

import { GraphQLClient } from 'graphql-request';
import { cookies as nextCookies } from 'next/headers';
import { redirect } from 'next/navigation';

export class ApiClient {
  public baseURL: string;
  private readonly clientId: string;
  private readonly secret: string;
  constructor(
    options: Options,
    private readonly cookies: typeof nextCookies,
  ) {
    Object.assign(this, options);
  }

  private getClient(token: string) {
    return new GraphQLClient(`${this.baseURL}/graphql`, {
      headers: {
        authorization: token,
      },
    });
  }

  private get basicClient() {
    const token = Buffer.from(`${this.clientId}:${this.secret}`).toString('base64');

    const header = `Basic ${token}`;

    return this.getClient(header);
  }

  private get authClient() {
    const token = this.cookies().get('token');

    if (!token) {
      redirect('/');
    }

    const header = `Bearer ${token.value}`;

    return this.getClient(header);
  }

  private setAuthCookies(tokens: TokensFragment) {
    const { accessToken, expiresAt, refreshToken } = tokens;

    this.cookies().set('token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: parseInt(expiresAt, 10),
    });

    this.cookies().set('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
  }




  async login(input: MutationLoginArgs) {
    const data = await this.basicClient.request(LoginDocument, input);

    this.setAuthCookies(data.login as TokensFragment);

    return data.login;
  }

  async profile() {
    const data = await this.authClient.request(ProfileDocument);

    return data.me as UserFragment;
  }

  async forgotPassword(input: MutationForgotPasswordArgs) {
    const data = await this.basicClient.request(ForgotPasswordDocument, input);

    return data.forgotPassword;
  }

  async recoverPassword(input: MutationRecoverPasswordArgs) {
    const data = await this.basicClient.request(RecoverPasswordDocument, input);

    this.setAuthCookies(data.recoverPassword);

    return data.recoverPassword;
  }

  async users(input: QueryUsersArgs) {
    const data = await this.authClient.request(UsersDocument, input);

    return data.users as UsersPayloadFragment;
  }

  async user(input: QueryUserArgs) {
    const data = await this.authClient.request(UserDocument, input);

    return data.user as FullUserFragment;
  }

  async createUser(input: CreateUserInput) {
    const data = await this.authClient.request(CreateUserDocument, { input });

    return data.createUser;
  }

  async updateUser(input: UpdateUserInput) {
    const data = await this.authClient.request(UpdateUserDocument, { input });

    return data.updateUser as UserFragment;
  }


  async uploadAttachment(input: UploadAttachmentInput) {
    const data = await this.authClient.request(UploadAttachmentDocument, {
      input,
    });

    return data.uploadAttachment as UploadAttachmentFragment;
  }

  async deleteAttachment(id: string) {
    const data = await this.authClient.request(DeleteAttachmentDocument, {
      id,
    });

    return data.deleteAttachment;
  }

  async updateAttachment(input: UpdateAttachmentInput) {
    const data = await this.authClient.request(UpdateAttachmentDocument, {
      input,
    });

    return data.updateAttachment as FullAttachmentFragment;
  }

  async notifications(input: NotificationFilter) {
    const data = await this.authClient.request(NotificationsDocument, {
      input,
    });

    return data.notifications as NotificationFragment[];
  }

  async updateNotificationStatus(input: UpdateNotificationStatusInput) {
    const data = await this.authClient.request(UpdateNotificationStatusDocument, { input });

    return data.updateNotificationStatus;
  }

  async readAllNotifications(input: ReadAllNotificationsInput) {
    const data = await this.authClient.request(ReadAllNotificationsDocument, {
      input,
    });

    return data.readAllNotifications;
  }

  async deleteAllNotifications(input: ReadAllNotificationsInput) {
    const data = await this.authClient.request(DeleteAllNotificationsDocument, {
      input,
    });

    return data.deleteAllNotifications;
  }

}

export interface Options {
  baseURL: string;
  clientId: string;
  secret: string;
}
