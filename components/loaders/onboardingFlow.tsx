import { Children, memo } from 'react'
import LoaderComponent from '@components/loaders/loader'

const OnboardingFlow = ({ data = null, children, active = 0 }) => (
  <LoaderComponent {...data}>
    {Children.toArray(children)[active]}
  </LoaderComponent>
)

export default memo(OnboardingFlow)
