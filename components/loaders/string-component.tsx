import { FC, HTMLAttributes, ReactNode, memo } from 'react'

interface StringComponentProps extends HTMLAttributes<HTMLElement> {
  as?: string
  cond?: boolean
  children: ReactNode
}
const StringComponent: FC<StringComponentProps> = ({
  as: Component,
  cond = true,
  children,
  ...props
}) => {
  if (!cond) return <></>
  if (!Component) return <>{children}</>
  return <Component {...props}>{children}</Component>
}

export default memo(StringComponent)
