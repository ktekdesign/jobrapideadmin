import { FC, LegacyRef, ReactNode, TextareaHTMLAttributes, forwardRef, memo } from 'react'
import Label from './label'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name?: string
  className?: string
  rows?: number
  children?: ReactNode
}
// eslint-disable-next-line react/display-name
const TextArea: FC<TextAreaProps> = forwardRef(({ children, label, name, className, rows, ...props }: TextAreaProps, ref: LegacyRef<HTMLInputElement>) =>
    <div className="row">
      <Label htmlFor={name ?? ""}>{label}</Label>
      <textarea
        id={name}
        name={name}
        rows={rows || 5}
        className={`form-input ${className}`}
        {...props}
      ></textarea>
      {children}
    </div>
)
export default memo(TextArea)
