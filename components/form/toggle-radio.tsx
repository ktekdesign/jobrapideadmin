import { LegacyRef, forwardRef, memo } from "react";

// eslint-disable-next-line react/display-name
const ToggleRadio = forwardRef(({items, checked, label, name} : {items: {text: string, value: string}[], checked?: string, label?: string, name: string}, ref: LegacyRef<HTMLInputElement>) =>
    <div className="flex justify-between items-center">
    <label className="w-1/3 label">{label}</label>
    <div id={name} className="toggle-radio-group">
        {items?.map(({text, value}, key) =>
        <div key={key} className="w-1/2">
            <input id={value} name={name} type="radio" value={value} className="input-toggle-radio peer" defaultChecked={value === checked} />
            <label htmlFor={value} className="toggle-ui">
                <span className="toggle-label-span">{text}</span>
            </label>
        </div>
        )}
    </div>
    </div>
)
export default memo(ToggleRadio)