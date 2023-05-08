import { NextApiRequest, NextApiResponse } from 'next';
import { mutationFromWPGraphQL } from 'lib/api';

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const data = await mutationFromWPGraphQL(`mutation RegisterUser {
    registerUser( input: {
      username: "${req.body?.email}",
      password: "${req.body?.password}"
      email: "${req.body?.email}"
    } ) {
      user {
        jwtAuthToken
        databaseId
        email
        avatar {
          url
        }
      }
    }
  }`);

    if (data) {
      return res.status(200).json({
        ...data?.registerUser?.user,
        id: data?.registerUser?.user.databaseId,
        authToken: data?.registerUser?.user.jwtAuthToken
      });
    }
    return res.status(400).json({ error: 'Vous avez déjà un compte' });
  } catch (error) {
    return res.status(400).end();
  }
};

export default Login;
