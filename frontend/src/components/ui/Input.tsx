import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="capitalize">
        {label}
      </label>
      <input
        id={id}
        type={id}
        name={id}
        required
        {...props}
        className="bg-transparent border border-slate-600 px-4 py-3 rounded-lg focus:border-slate-800"
      />
    </div>
  );
};
