import { Dispatch, SetStateAction, memo } from "react";
import Button from "./form/Button";

const OnboardingControl = ({active, count, handleNext, handlePrev} : {active: number, count: number, handleNext: () => void, handlePrev: () => void}) =>
    <div className="flex items-center justify-between gap-8 mt-4">
        <Button label="submit" className={`${active ? "button" : "hidden"} bg-primary text-dark`} type="button" onClick={handlePrev}>
            Précédent
        </Button>
        <Button label="submit" className={active >= count ? "hidden" : "button"} type={active === count - 1 ? "submit" : "button"} onClick={handleNext}>
            {active === count - 1 ? "Envoyer" : "Suivant"}
        </Button>
    </div>

export default memo(OnboardingControl)