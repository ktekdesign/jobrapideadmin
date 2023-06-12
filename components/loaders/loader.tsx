import { Children, cloneElement, isValidElement, memo } from 'react'
import StringComponent from './string-component'

const LoaderComponent = ({
  children,
  component = null,
  className = '',
  ...props
}) => (
  <StringComponent {...{ component, className, ...props }}>
    {Children.map(children, (child) => {
      if (isValidElement(child)) return cloneElement(child, { ...props })
      return <>{child}</>
    })}
  </StringComponent>
)

export default memo(LoaderComponent)
