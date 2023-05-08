import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  const data = await signIn('credentials', {
    email: req.body?.email,
    password: req.body?.password,
    redirect: false
  });

  if (data?.ok) {
    return res.status(200).send(data);
  }
  return res.status(500).end();
};

export default Login;
