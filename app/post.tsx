'use client';
import { Card } from "@tremor/react";
import { Post } from "../utils/interfaces/data"
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
            {data?.posts?.nodes?.map((post: Post, key: any) =>
                <Card className="mt-6" key={key}>
                    <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${post.uri}`} target="_blank">
                        {post.title}
                    </Link>
                    <Date date={post.date} className="block" />
                </Card>
            )}
        </Loading>
    );
  }
  