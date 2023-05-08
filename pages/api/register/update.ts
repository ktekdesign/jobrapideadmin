import { NextApiRequest, NextApiResponse } from 'next';
import { mutationFromWPGraphQL } from 'lib/api';

const RegisterUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    /* const data = await mutationFromWPGraphQL(`mutation RegisterUser {
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
  }`); */

    return res.status(200).json({ message: 'Ok' });
  } catch (error) {
    return res.status(400).end();
  }
};

export default RegisterUpdate;
