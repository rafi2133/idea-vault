import IdeaDetailsClient from '@/components/MainRouteClient/IdeaDetailsClient';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = {
  title: "Idea Details | IdeaVault",
  description: "View idea details on IdeaVault.",
};

const IdeaDetailspage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  
  const res = await fetch(`http://localhost:5000/idea/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const idea = await res.json();

  return <IdeaDetailsClient idea={idea} />;
};

export default IdeaDetailspage;