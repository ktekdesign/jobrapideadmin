import { LegacyRef, forwardRef, memo, useState } from "react"
// eslint-disable-next-line react/display-name
const Radio = forwardRef(({items, checked, label, name} : {items: {id: number, name: string}[], checked?: string, label?: string, name: string}, ref: LegacyRef<HTMLInputElement>) => {
    const [current, setCurrent] = useState(null)
    const onChange = (e: any) => setCurrent(e.target.nextSibling.textContent)

    return ( 
        <div className="relative group">
        <label className="label">{label}</label>
        <button id="dropdownHelperRadioButton" data-dropdown-toggle="dropdownHelperRadio" className="dropdownHelperRadioButton peer" type="button">{current ?? "Choisir"} 
        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
        <div id="dropdownHelperRadio" className="dropdownHelperRadio">
            <ul className="radio-container">
            {items.map(({id, name: text}, key) =>
                <li key={key}>
                <div className="radio-item">
                <input id={`${name}-${key}`} name={name} type="radio" value={id} onChange={onChange} className="helper-radio" ref={ref} defaultChecked={checked === id.toString()} />
                <label htmlFor={`${name}-${key}`} className="helper-radio-label radio-label">
                        {text}
                    </label>
                </div>
            </li>
            )}
            </ul>
        </div>
        </div>
   )
}
)
export default memo(Radio)