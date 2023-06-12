import { ReactNode, memo } from 'react'
import LoaderComponent from '@components/loaders/loader'

const MappedComponent = ({ children, items, ...props }: {children: ReactNode; items?: any[];}) => (
  <>
    {items?.map((item, key) => (
      <LoaderComponent key={key} {...{ ...item, ...props }}>
        {children}
      </LoaderComponent>
    ))}
  </>
)

export default memo(MappedComponent)
