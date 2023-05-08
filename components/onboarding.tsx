import { Dispatch, ReactNode, SetStateAction, memo } from "react";
import OnboardingFlow from "./onboardingFlow";
import OnboardingControl from "./onboardingControl";

const Onboarding = ({children, active, count, setCount, handleNext, handlePrev} : {children: ReactNode, active: number, count: number, setCount: Dispatch<SetStateAction<number>>, handleNext: () => void, handlePrev: () => void}) =>
    <>
        <OnboardingFlow active={active} count={count} setCount={setCount}>
            {children}
        </OnboardingFlow>
        <OnboardingControl active={active} count={count} handleNext={handleNext} handlePrev={handlePrev} />
    </>

export default memo(Onboarding)