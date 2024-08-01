import React, { useState } from "react";
import {
  SelectValue,
  Input,
  Textarea,
  NativeSelect,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "../";

import {
  Form as NativeForm,
  FormField as NativeFormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../native-form';

export function FormInput(props: FormInputProps) {
  const {
    type,
    placeholder,
    label,
    name,
    disabled,
    defaultValue,
    fullWidth,
    value,
    description,
    small,
  } = props;
  return (
    <NativeFormField
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            fullWidth
              ? `w-full  flex flex-col gap-0`
              : small
                ? "w-[150px] flex flex-col gap-0"
                : "w-full md:w-[300px] flex flex-col gap-0"
          }
        >
          {label && (
            <FormLabel className="text-black dark:text-textColor font-semibold">
              {label}:
            </FormLabel>
          )}

          <Input
            type={type ? type : "text"}
            contentEditable="true"
            className="bg-transparent dark:bg-inputBg text-textColor  placeholder:textColorLight border border-borderColor h-12"
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled ? true : false}
            {...field}
            defaultValue={defaultValue ? defaultValue : undefined}
            value={value ? value : undefined}
          />

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-semibold text-[#845adf]">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
export function FormFileInput(props: FormFileInputProps) {
  const { placeholder, label, name, disabled, setFile, description } = props;
  type FilesType = HTMLInputElement;
  return (
    <NativeFormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:w-[48%] flex flex-col gap-0 ">
          {label && <FormLabel className="text-black">{label}:</FormLabel>}

          <Input
            type="file"
            contentEditable="true"
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled ? disabled : false}
            {...field}
            //@ts-ignore
            onChange={(e: React.ChangeEvent) => setFile(e.target.files[0])}
          />

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-[#845adf]">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export function FormTextArea(props: FormTextAreaProps) {
  const {
    placeholder,
    label,
    name,
    disabled,
    oneLine,
    defaultValue,
    description,
  } = props;

  return (
    <NativeFormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="text-textColorLight dark:text-textColor font-semibold">{label}:</FormLabel>}

          <Textarea
            className={oneLine ? "h-[40px]" : ""}
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled ? disabled : false}
            {...field}
            defaultValue={defaultValue ? defaultValue : undefined}
          />

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-semibold text-primary">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export function FormSelect(props: SelectProps) {
  const {
    label,
    name,
    placeholder,
    data,
    disabled,
    defaultValue,
    fullWidth,
    description,
  } = props;

  return (
    <NativeFormField
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            fullWidth
              ? "w-full  flex flex-col gap-0"
              : "w-full md:w-[300px] flex flex-col gap-0"
          }
        >
          {label && (
            <FormLabel className="text-textColorLight dark:text-textColor">
              {label}:
            </FormLabel>
          )}

          <NativeSelect
            onValueChange={field.onChange}
            disabled={disabled ? disabled : false}
            defaultValue={defaultValue ? defaultValue : undefined}
          >
            <SelectTrigger className="bg-background2">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className=" text-textColorLight">
                  {placeholder}
                </SelectLabel>
                {data.map((item: SelectData) => (
                  <SelectItem key={item.id} value={item.value.toString()}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </NativeSelect>

          <FormMessage className="text-xs" />
          {description && (
            <FormDescription className="text-xs font-normal text-[#845adf]">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export type FormTextAreaProps = {
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
  description?: string;
  oneLine?: boolean;
};

export type FormInputProps = {
  type?: string;
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string | number;
  fullWidth?: boolean;
  value?: string | number;
  description?: string;
  small?: boolean;
  width?: string;
};
export type FormFileInputProps = {
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  description?: string;
};

export type SelectProps = {
  label?: string;
  name: string;
  placeholder: string;
  data: SelectData[] | any;
  disabled?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  description?: string;
  width?: string;
};

export type SelectData = {
  id: string;
  title: string | number;
  value: string | number;
};
