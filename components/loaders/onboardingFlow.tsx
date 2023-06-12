import { Children, ReactNode, memo } from 'react'
import LoaderComponent from '@components/loaders/loader'

const OnboardingFlow = ({ data, children, active = 0 }: {children: ReactNode; data?: any; active?: number}) => (
  <LoaderComponent {...data}>
    {Children.toArray(children)[active]}
  </LoaderComponent>
)

export default memo(OnboardingFlow)
