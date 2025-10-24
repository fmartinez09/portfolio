import ProfileHeader from '@/components/ProfileHeader'
import Reveal from '@/components/anim/Reveal'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  return (
    <>

      <main>
        <ProfileHeader />

        <section className="mx-auto mt-20 max-w-5xl">
          <Reveal>
            <h2 className="text-2xl font-semibold mb-8">Work</h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Reveal key={i} delay={i * 0.06}>
                <ProjectCard
                  title={`Proyecto ${i}`}
                  subtitle="UI/UX"
                  cover={`/covers/cover${i}.jpg`}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
