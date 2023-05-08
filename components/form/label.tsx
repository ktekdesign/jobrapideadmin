import React, { FC, LabelHTMLAttributes, ReactNode, memo } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  children: ReactNode
}
const Label: FC<LabelProps> = ({ children, htmlFor, ...props }) => {
  const { className, ...rest } = props
  return (
    <label
      className={`label ${className ? className : ''}`}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </label>
  )
}

export default memo(Label)
