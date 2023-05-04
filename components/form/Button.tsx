import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  label: string
}

const Button: FC<ButtonProps> = ({ children, label, ...props }) => {
  const { className, ...rest } = props
  const args = rest ?? {}

  return (
    <button
      className={className ?? 'button'}
      aria-label={label}
      title={label}
      {...args}
    >
      {children}
    </button>
  )
}
export default memo(Button)
