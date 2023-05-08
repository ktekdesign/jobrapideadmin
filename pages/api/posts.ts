import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { queryFromWPGraphQL } from '../../lib/api';
import { query } from '../../lib/queries';
import { mapPost } from '../../utils/mapping';

const UserPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    try {
      const posts = await queryFromWPGraphQL(query, {
        id: token.id,
        page: req.query?.page?.toString() ?? '0'
      });

      const mappedPosts = posts.posts.nodes.map((post: any) => mapPost(post));
      return res.status(200).json({
        posts: mappedPosts,
        count: posts.posts.pageInfo.offsetPagination.total
      });
    } catch (error) {
      return res.status(500).end();
    }
  } else {
    // Not Signed in
    return res.status(402).end();
  }
};
export default UserPosts;
