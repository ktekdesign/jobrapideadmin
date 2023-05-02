'use client'
import { redirect } from 'next/navigation';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { token: string };
}) {
  const token = searchParams?.token;
  if(!token) redirect('/')
  return <></>
}
