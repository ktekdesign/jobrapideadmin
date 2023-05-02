import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { redirectPath } from '../../utils/redirectPath';

const HardRedirect = async (req: NextApiRequest, res: NextApiResponse) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  if (token) {
    // Signed in
    return res.status(302).redirect(redirectPath(token.role));
  }
  return res.status(301).redirect('/');
};
export default HardRedirect;
