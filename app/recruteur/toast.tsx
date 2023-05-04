import Link from "next/link";
import { Text } from '@tremor/react';

const Toast = ({text, title, link } : {text?: string, title: string, link: string}) => 
    <div className="sticky w-11/12 sm:w-sm h-40 sm:h-24 p-0.5 z-10 bottom-0 left-0 right-0 mx-auto">
      <div className="w-full h-full rounded-2xl bg-slate-200 border border-gray-200 flex flex-col sm:flex-row items-center justify-center sm:justify-between px-5">
        <Text className="text-black text-sm flex items-center justify-center p-3">
          {text}
        </Text>
        <Link
          className="text-white text-xs bg-secondary hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
          href={link}
        >
          {title}
        </Link>
      </div>
    </div>

export default Toast
