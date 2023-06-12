import { sendPasswordResetEmail } from 'lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

const ForgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  const data = await sendPasswordResetEmail({
    email: req.body?.email
  });

  if (data?.success) {
    return res.status(200).send(data);
  }
  return res.status(500).end();
};

export default ForgotPassword;
