import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import Modules from '../components/Modules'
import Pricing from '../components/Pricing'
import Screenshots from '../components/Screenshots'
import FAQ from '../components/FAQ'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="CBC School Management System"
        subtitle="A comprehensive platform for managing all aspects of school operations under the Competency-Based Curriculum"
      />

      {/* Features Section */}
      <Features />

      {/* Modules Section */}
      <Modules backgroundClass="bg-slate-50" />

      {/* Screenshots Section */}
      <Screenshots />

      {/* Stats Section */}
      <Stats bgColor="bg-slate-50" />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing backgroundClass="bg-slate-50" />

      {/* FAQ Section */}
      <FAQ />

      {/* Call to Action Section */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}
