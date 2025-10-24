import ProfileHeader from "@/components/ProfileHeader"
import AboutSection from "@/components/AboutSection"
import WritingList from "@/components/WritingList"

export default function Home() {
  return (
    <main className="space-y-20 md:space-y-24">
      <ProfileHeader />
      <AboutSection />
      <WritingList limit={3} />
    </main>
  )
}