import { Children, ReactNode, cloneElement, isValidElement, memo } from 'react'
import StringComponent from './string-component'

const LoaderComponent = ({
  children,
  component,
  className,
  ...props
}: {children: ReactNode; component?: string; className?: string}) => (
  <StringComponent {...{ component, className, ...props }}>
    {Children.map(children, (child) => {
      if (isValidElement(child)) return cloneElement(child, { ...props })
      return <>{child}</>
    })}
  </StringComponent>
)

export default memo(LoaderComponent)
