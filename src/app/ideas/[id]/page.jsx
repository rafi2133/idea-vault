
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`http://localhost:5000/idea/${id}`);
    const idea = await res.json();
    return {
      title: `${idea.title} | IdeaVault`,
      description: idea.shortDescription || "Read more about this innovative idea on IdeaVault.",
    };
  } catch {
    return {
      title: "Idea Details | IdeaVault",
      description: "View idea details on IdeaVault.",
    };
  }
}



import IdeaDetailsClient from '@/components/MainRouteClient/IdeaDetailsClient';

export default function IdeaDetailsPage({ params }) {
  return <IdeaDetailsClient params={params} />;
}