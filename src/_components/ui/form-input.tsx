"use client";

import React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import Input from "@/_components/ui/input";

type BaseInputProps = React.ComponentProps<typeof Input>;

export type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName>["control"];
  rules?: ControllerProps<TFieldValues, TName>["rules"];
  defaultValue?: ControllerProps<TFieldValues, TName>["defaultValue"];
} & Omit<BaseInputProps, "value" | "onChange" | "onBlur" | "name" | "ref">;

function FormInputInner<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  defaultValue,
  ...rest
}: FormInputProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue as any}
      render={({ field }) => (
        <Input
          {...rest}
          {...field}
          // keep password toggle etc. from base Input
        />
      )}
    />
  );
}

const FormInput = React.memo(FormInputInner) as typeof FormInputInner;

export default FormInput;
