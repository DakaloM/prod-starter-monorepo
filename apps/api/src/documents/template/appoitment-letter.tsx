import { formatDate, formatDateSimple } from '@imax/utils';

import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { zip } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { createTw } from 'react-pdf-tailwind';
import { Title } from '~/account';

type TailwindStyle = (input: string) => Style;

const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: 'cornflowerblue',
        primary: 'hsl(3.2 67.7% 37.6%)',
      },
    },
  },
}) as TailwindStyle;

export type AppointmentLetterProps = {
  name: string;
  surname: string;
  jobTitle: string;
  date: Date;
  title: Title;
  streetAddress: string;
  zipCode: string;
  city: string;
  startDate: Date;
  annualSalary: string | number;
  monthlySalary: string | number;
  salaryGrade: string;
  generalSecretary: string;
  
};

export function AppointmentLetterTemplate(props: AppointmentLetterProps) {
  const {
    name,
    surname,
    jobTitle,
    date,
    title,
    streetAddress,
    zipCode,
    city,
    startDate,
    annualSalary,
    monthlySalary,
    salaryGrade,
    generalSecretary,
    
  } = props;

  return (
    <Document>
      <Page size="A4" style={tw('p-4 flex flex-col gap-4')}>
        <Text style={tw('text-sm mb-4')}>{formatDate(date.toDateString())}</Text>
        <Text style={tw('text-sm mb-4')}>{`${title} ${name} ${surname}`}</Text>
        <Text style={tw('text-sm mb-4')}>{streetAddress}</Text>
        <Text style={tw('text-sm mb-4')}>{city}</Text>
        <Text style={tw('text-sm mb-4')}>{zipCode}</Text>

        <Text style={tw('text-sm mb-4')}>{`Dear ${title} ${surname},`}</Text>

        <Text style={tw('text-sm mb-4')}>Job Offer Letter</Text>

        <Text style={tw('text-sm mb-4')}>
          {`I have pleasure in confirming your appointment as ${jobTitle} in the
          National Union of Mineworkers. The terms and conditions of your employment are as follows:`}
        </Text>

        <View style={tw('text-sm mb-4')}>
          <Text>{`Commencement Date: ${formatDate(startDate.toDateString())}`}</Text>
          <Text>{`Job Title: ${jobTitle}`}</Text>
          <Text>{`Salary per annum: R ${annualSalary}`} </Text>
          <Text>{`Salary per month: R ${monthlySalary}`}</Text>
          <Text>{`Salary Grade: ${salaryGrade}`}</Text>
          <Text>Hours of work: 8:30am-5:00pm (Monday to Friday), 8:30am-1:00pm (Saturday)</Text>
          <Text>Pension Fund: Employer contributes 15.54%, Employee contributes 7.5%</Text>
        </View>

        <Text style={tw('text-sm mb-4')}>
          Medical Aid Membership is a condition of employment in the NUM and as such all Staff
          members in the NUM must belong to a medical Aid Scheme of their choice. There is an
          existing inhouse Medical Aid arrangement where staff members belonging to Bonitas
          Discovery or Compcare receive a Medical Aid Subsidy allocated as follows:
        </Text>

        <View style={tw('text-sm mb-4')}>
          <Text>Medical Aid: Employer contributes 60% of total contribution.</Text>
          <Text>Working tools: Laptop and 3g, Cellphone</Text>
        </View>

        <Text style={tw('text-sm mb-4')}>Probation</Text>

        <Text style={tw('text-sm mb-4')}>
          Your employment is subject to a probationary period of 3 months which NUM in its
          discretion and after consultation with you may extend for a further period of not more
          than 3 months. During this probationary period your performance will be assessed on a
          regular basis. During the probation NUM will evaluate your performance in order to
          determine whether or not an offer of permanent employment will be made to you. During the
          probation NUM will provide you with the necessary guidance regarding your duties in order
          to assist you in performing your job.
        </Text>

        <Text style={tw('text-sm mb-4')}>
          You will receive the following benefits after three (3) months probation.
        </Text>

        <View style={tw('text-sm mb-4')}>
          <Text>Car Allowance: R0000.00 per month (As per the car scheme policy)</Text>
          <Text>Petrol Allowance: R0000.00 per month (As per the car scheme policy)</Text>
          <Text>
            Housing Subsidy: R0000.00 (If owning a bonded house) or 90% of repayment whichever is
            less or R2250.00 rental allowance if not owning a bonded house
          </Text>
          <Text>Cellphone Allowance: R000.00 per month</Text>
        </View>

        <Text style={tw('text-sm mb-4')}>
          For further details about your conditions of service please contact the Human Resource.
        </Text>

        <Text style={tw('text-sm mb-4')}>
          Kindly indicate your acceptance of the offer with NUM subject to its conditions (as
          attached hereto) by signing the attached copy and returning it to the Human Resource
          Office within five working days after receiving the offer.
        </Text>

        <Text style={tw('text-sm mb-4')}>Yours faithfully,</Text>

        <Text style={tw('text-sm mb-4')}>{`${generalSecretary}`}</Text>
        <Text style={tw('text-sm mb-4')}>General Secretary</Text>

        <Text style={tw('text-sm mb-4')}>Signature of acceptance: _______________________</Text>
        <Text style={tw('text-sm mb-4')}>Date: ____________________________________</Text>

        <Text style={tw('text-sm mb-4')}>{`${formatDate(date.toDateString())}`}</Text>
      </Page>
    </Document>
  );
}
