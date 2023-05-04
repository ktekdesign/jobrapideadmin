import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { queryFromWPGraphQL } from '../../../lib/api';
import { postQuery } from '../../../lib/queries';
import { mapPost } from '../../../utils/mapping';

const UserPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token) {
    // Signed in

    const post = await queryFromWPGraphQL(postQuery, {
      id: req.query?.id?.toString() ?? ''
    });

    if (post?.post?.authorDatabaseId === Number(token.id))
      return res.status(200).json(mapPost(post?.post));
    return res.status(401).end();
  } else {
    // Not Signed in
    return res.status(402).end();
  }
};
export default UserPost;
