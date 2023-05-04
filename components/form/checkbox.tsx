import { isObject } from "lodash-es"
import { memo } from "react"
import Loading from "../../app/loading"
import { InputHTMLAttributes } from "react"
import { LegacyRef } from "react"
import { forwardRef } from "react"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    items?: any
    checkeds?: number[]
}
// eslint-disable-next-line react/display-name
const ChexkBox = forwardRef(({items, checkeds, ...props}: CheckboxProps, ref: LegacyRef<HTMLInputElement>) =>
<Loading loading={!isObject(items)}>
    <ul className="items-center w-full gap-4 text-sm font-medium text-gray-900 flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
        {isObject(items) && Object.values(items)?.map((item: any) =>
            <li key={item?.id} className="bg-white cursor-pointer border rounded-lg w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center p-4 gap-4 justify-between">
                    <input id={item?.slug} ref={ref} type="checkbox" defaultChecked={checkeds?.includes(item?.id)} value={item?.id.toString()} className="checkbox" {...props} />
                    <label htmlFor={item?.slug} className="flex-1 w-full mb-0 dark:text-gray-300">{item?.name}</label>
                </div>
            </li>
        )}
    </ul>
</Loading>
)

export default memo(ChexkBox)