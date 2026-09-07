import Banner from "@/components/Banner";
import CommunityStats from "@/components/CommunityStats";
import HowItWorks from "@/components/HowItWorks";
import TrendingIdeas from "@/components/TrendingIdeas";


export default function Home() {
  return (
    <div>
    <Banner></Banner>
    <TrendingIdeas></TrendingIdeas>
    <HowItWorks></HowItWorks>
    <CommunityStats></CommunityStats>
    </div>
  );
}
