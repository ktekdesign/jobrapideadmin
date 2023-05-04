'use client';
import { Card } from "@tremor/react";
import { Post } from "../types/data"
import { useQuery, gql } from '@apollo/client'
import { query } from '../lib/queries';
import { useSession } from "next-auth/react";
import Loading from "./loading";
import Link from "next/link";
import Date from "../components/date";

export default function PostsList({page = 1}:{page?:number}) {
    const session = useSession()
    
    const userPostsQuery = query.replaceAll("$userId", `${session.data?.id}`).replaceAll("$page", `${10 * page - 10}`)
 
  const QUERY = gql`${userPostsQuery}`
    const { data, loading } = useQuery(QUERY)
    
    return (
        <Loading loading={loading}>
            {data?.posts?.nodes?.map((post: any, key: any) =>
                <Card className="mt-6 gap-8 flex justify-between items-center" key={key}>
                    <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${post.uri}`} target="_blank">
                        {post.title}
                        <Date date={post.date} className="block" />
                    </Link>
                    <Link href={`/recruteur/edit/${post?.databaseId}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
</Link>
                    
                </Card>
            )}
        </Loading>
    );
  }
  