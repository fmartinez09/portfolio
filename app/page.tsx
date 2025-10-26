import ProfileHeader from "@/components/ProfileHeader";
import AboutSection from "@/components/AboutSection";
import WritingList from "@/components/WritingList";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl md:max-w-4xl px-4 sm:px-6 py-10 pb-24 lg:pb-10 space-y-12 md:space-y-16">
      <ProfileHeader />
      <WritingList limit={3} />
    </main>
  );
}
