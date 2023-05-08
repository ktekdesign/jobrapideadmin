import { Title } from "@tremor/react";
import { ReactNode, memo } from "react";

const Step = ({title, active, count, children} : {title?: string, active?: number, count?: number, children: ReactNode}) =>
    <>
        <Title className="step-title">
        {active !== undefined && count && `Etape ${active + 1} / ${count}`} {title && ` : ${title}`}
        </Title>
        {children}
    </>

export default memo(Step)