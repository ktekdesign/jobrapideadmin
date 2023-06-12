import { Card } from "@tremor/react";
import Link from "next/link";
import Date from "../components/date";
import { memo } from "react";

const PostTypeList = ({posts}:{posts?:any}) =>
    <>
        {posts.map((post: any, key: any) =>
            <Card className="mt-6 gap-8 flex justify-between items-center" key={key}>
                <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${post.uri}`} target="_blank">
                    {post.title}
                    <Date date={post.date} className="block" />
                </Link>
            </Card>
        )}
    </>
  
  export default memo(PostTypeList)