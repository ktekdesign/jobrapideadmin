import React, { FC, LabelHTMLAttributes, ReactNode, memo } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  children: ReactNode
}
const Label: FC<LabelProps> = ({ children, htmlFor, ...props }) => {
  const { className, ...rest } = props
  return (
    <label
      className={`block text-gray-700 text-sm font-bold mb-2 ${className ? className : ''}`}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </label>
  )
}

export default memo(Label)
