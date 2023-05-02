'use client';
import { Title, Text } from '@tremor/react';
import axios from 'axios';
import { Suspense } from 'react';
import PostsList from '../post';

export default async function IndexPage() {
  try {
    const {data} = await axios.get("/api/user/posts")
    return (
      <>
        <Title>Mes Publications</Title>
        <Text>
          Ceci est la liste de toutes vos publications.
        </Text>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <PostsList posts={data?.posts} />
        </Suspense>
      </>
    );
  } catch(error) {
    console.log(error)
  }
}
