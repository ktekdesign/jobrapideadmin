import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getUserPosts } from '../../../lib/api';

const UserPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  if (token) {
    // Signed in
    const posts = await getUserPosts({ data: {} });
    res.status(200).json(posts);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
export default UserPosts;
