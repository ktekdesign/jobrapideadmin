import { InputHTMLAttributes, LegacyRef, ReactNode, forwardRef, memo } from 'react'
import Label from './label'
import React from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode, label: string, name?: string, type?: string, className?: string, placeholder?: string
}
// eslint-disable-next-line react/display-name
const Input = forwardRef(({ children, label, name, type, className, placeholder, ...props }: InputProps, ref: LegacyRef<HTMLInputElement>) =>
    <div className="mb-4">
      <Label htmlFor={name ?? ""}>{label}</Label>
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        placeholder={placeholder ?? label}
        ref={ref}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className ?? ""}`}
        {...props}
      />
      {children}
    </div>
)
export default memo(Input)
