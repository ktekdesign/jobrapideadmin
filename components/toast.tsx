import Link from "next/link";
import { Text } from '@tremor/react';

const Toast = ({text, title, link } : {text?: string, title: string, link: string}) => 
    <div className="toast-container">
      <div className="toast-inner-container">
        <Text className="toast-text">
          {text}
        </Text>
        <Link
          className="toast-link"
          href={link}
        >
          {title}
        </Link>
      </div>
    </div>

export default Toast
