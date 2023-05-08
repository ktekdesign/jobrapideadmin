import { memo, useEffect, useRef, cloneElement, isValidElement, Dispatch, SetStateAction, Children, ReactNode } from 'react'

const OnboardingFlow = ({
  children,
  active,
  count,
  setCount
} : {children: ReactNode, active: number, count?: number, setCount?: Dispatch<SetStateAction<number>>}) => {
  const ref = useRef(0);
  
  useEffect(() => {
    if(!setCount) return
    ref.current = active
    setCount(Children.count(children))
  })
  
  return (
    <>
      {Children.map(children, (child, key) => 
      isValidElement(child) &&
        <div className={key === active ? `block ${ref.current < active ? "animate-slideinRight" : "animate-slideinLeft"}` : 'hidden'}>{cloneElement(child, {...{active, count} })}</div>
      )}
    </>
  )
}
export default memo(OnboardingFlow)
