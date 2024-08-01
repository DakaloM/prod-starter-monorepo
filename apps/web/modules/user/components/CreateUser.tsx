'use client';

import { Gender, Race, Title, UserRole } from '@imax/client';
import {
  Button,
  TextInput,
  Select,
  DateInput,
  Form,
  Dialog,
  DialogContent,
  DialogTrigger,
  FormFieldProps,
  closeDialog,
  EmailInput,
  FetchOptions,
  FieldProps,
} from '@imax/ui';
import { startCase } from '@imax/utils';

import { executeApi } from 'client/api';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import * as saIdParser from 'south-african-id-parser';
import { RefinementCtx, z } from 'zod';


const userSchema = z.object({
  name: z.string(),
  surname: z.string(),
  idNumber: z.string().length(13, 'ID number must be 13 characters long'),
  gender: z.nativeEnum(Gender),
  race: z.nativeEnum(Race),
  email: z.string(),
  title: z.nativeEnum(Title),
  birthDate: z.coerce.date(),
  role: z.nativeEnum(UserRole),

});

type Schema = typeof userSchema;
type Data = z.infer<Schema>;


const raceOptions = Object.values(Race).map((value) => ({
  value,
  label: startCase(value),
}));

const genderOptions = Object.values(Gender).map((value) => ({
  value,
  label: startCase(value),
}));

const titleOptions = Object.values(Title).map((value) => ({
  value,
  label: value,
}));

const userRoles = Object.values(UserRole).map((value) => ({
  value,
  label: startCase(value),
}));

const fields =
  [
    {
      name: 'name',
      className: 'col-span-1',
      Component: TextInput,
    },
    {
      name: 'surname',
      className: 'col-span-1',
      Component: TextInput,
    },
    {
      name: 'title',
      className: 'col-span-1',
      Component: (props: FormFieldProps<Title>) => <Select {...props} options={titleOptions} />,
    },

    {
      name: 'email',
      className: 'col-span-1',
      Component: EmailInput,
    },
    {
      name: 'idNumber',
      label: 'ID or Passport Number',
      className: 'col-span-1',
      Component: TextInput,
    },
    {
      name: 'role',
      className: 'col-span-1',
      Component: (props: FormFieldProps<UserRole>) => <Select {...props} options={userRoles} />,
    },
    {
      name: 'gender',
      className: 'col-span-1',
      Component: (props: FormFieldProps<Gender>) => <Select {...props} options={genderOptions} />,
    },

    {
      name: 'race',
      className: 'col-span-1',
      Component: (props: FormFieldProps<Race>) => <Select {...props} options={raceOptions} />,
    },
    {
      name: 'birthDate',
      className: 'col-span-1',
      Component: DateInput,
    },

 
  ] as const;

export const CreateUser = () => {
  const router = useRouter();

  const onSubmit = async (data: Data) => {
    await executeApi('createUser', {
      ...data,
      role: data.role as unknown as UserRole,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <div className="flex items-center gap-2">
            <PlusIcon size={25} /> New user
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <span className="text-center font-semibold">Create new user</span>
        <div className="flex flex-col p-6">
          <Form
            fields={fields as any}
            onSubmit={onSubmit}
            onCompleted={() => {
              router.refresh();
              closeDialog();
            }}
            initialValues={{}}
            // @ts-ignore
            schema={userSchema}
            actionText="Create user"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
