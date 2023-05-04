import { cloneElement } from 'react'
import { Dispatch } from 'react'
import { useEffect } from 'react'
import { SetStateAction } from 'react'
import { isValidElement } from 'react'
import { Children, memo } from 'react'
import { ReactNode } from 'react'

const OnboardingFlow = ({
  children,
  active,
  setCount
} : {children: ReactNode, active: number, setCount: Dispatch<SetStateAction<number>>}) => {
  useEffect(() => setCount(Children.count(children)))
  
  return (
    <>
      {Children.map(children, (child, key) => 
      isValidElement(child) &&
        <div className={key === active ? 'block' : 'hidden'}>{cloneElement(child)}</div>
      )}
    </>
  )
}
export default memo(OnboardingFlow)
