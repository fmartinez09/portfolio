import AboutSection from '@/components/AboutSection'
import SectionRow from '@/components/SectionRow'


export default function AboutPage() {
    return (
         <main className="mx-auto max-w-3xl md:max-w-4xl px-4 sm:px-6 pt-16 md:pt-32 pb-24 lg:pb-10 space-y-12 md:space-y-16">

      <AboutSection />
            {/* Experience */}
             <SectionRow label="Experience" size="sm">
                <div className="space-y-6">
                    {/* Fullstack Developer */}
                    <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-6">
                        <div className="text-sm text-zinc-600 dark:text-zinc-500">June 2024 — Now</div>
                        <div>
                            <div className="font-semibold text-foreground">Fullstack Developer</div>
                            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                Built and maintained Java Spring Boot microservices and React front-ends integrated with Oracle 12c,
                                serving hundreds of daily users. Deployed to Kubernetes with CI/CD, monitoring, and fault-injection
                                testing; introduced GitHub Actions and IaC (Packer/Terraform).
                            </div>
                        </div>
                    </div>

                    {/* Data Engineering Assistant */}
                    <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-6">
                        <div className="text-sm text-zinc-600 dark:text-zinc-500">Aug 2022 — Dec 2023</div>
                        <div>
                            <div className="font-semibold text-foreground">Data Engineering Assistant</div>
                            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                Teaching assistant in data engineering; analytics with R and ML/DL/Data Mining in Python (scikit-learn, Keras).
                            </div>
                        </div>
                    </div>
                </div>
            </SectionRow>

            {/* Education */}
             <SectionRow label="Education" size="sm">
                <div className="space-y-6">
                    <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-6">
                        <div className="text-sm text-zinc-600 dark:text-zinc-500">March 2019 — March 2024</div>
                        <div>
                            <div className="font-semibold text-foreground">Bachelor’s in Computer Engineering</div>
                            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                Universidad de La Frontera.
                            </div>
                        </div>
                    </div>
                </div>
            </SectionRow>
        </main>
    )
}