import AboutSection from '@/components/AboutSection'
import SectionRow from '@/components/SectionRow'

export default function AboutPage() {
    return (
        <main className="space-y-12 md:space-y-16 pt-12 md:pt-30">
            <AboutSection />

            {/* Experience */}
            <SectionRow label="Experience" size="sm">
                <div className="space-y-6">
                    <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-6">
                        <div className="text-sm text-zinc-500">June 2024 — Now</div>
                        <div>
                            <div className="font-semibold text-zinc-100">Fullstack Developer</div>
                            <div className="mt-1 text-sm text-zinc-500">Built and maintained Java Spring Boot microservices and React front-ends integrated with Oracle 12c
                                databases serving hundreds of daily users.</div>
                        </div>
                    </div>
                </div>
            </SectionRow>

            {/* Education */}
            <SectionRow label="Education" size="sm">
                <div className="space-y-6">
                    <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-6">
                        <div className="text-sm text-zinc-500">March 2019 – March 2024</div>
                        <div>
                            <div className="font-semibold text-zinc-100">Bachelor’s in Computer Engineering</div>
                             <div className="mt-1 text-sm text-zinc-500">Universidad de La Frontera</div>
                        </div>
                    </div>
                </div>
            </SectionRow>
        </main>
    )
}
