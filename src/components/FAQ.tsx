import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  subtitle?: string
  faqs?: FAQItem[]
}

const FAQ: React.FC<FAQProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Get answers to common questions about our school management system',
  faqs = [],
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Default FAQs if none are provided
  const defaultFaqs: FAQItem[] = [
    {
      question: 'What is the CBC School Management System?',
      answer:
        'The CBC School Management System is a comprehensive platform designed to manage all aspects of school operations under the Competency-Based Curriculum. It includes modules for academic management, student records, financial tracking, communication tools, and more.',
    },
    {
      question: 'How does the system support CBC implementation?',
      answer:
        'Our system provides specialized tools for tracking competencies, creating and managing CBC assessments, generating CBC-compliant report cards, and maintaining detailed learning progress records for each student across all competency areas.',
    },
    {
      question: 'Can multiple schools use the same system?',
      answer:
        'Yes, our platform is built with multi-tenant architecture, allowing multiple schools or institutions to use the system with complete data separation and custom branding options.',
    },
    {
      question: 'What kind of support is available?',
      answer:
        'We offer 24/7 technical support, comprehensive documentation, video tutorials, regular training webinars, and optional on-site training for new schools joining the platform.',
    },
    {
      question: 'Is the system accessible on mobile devices?',
      answer:
        'Yes, our platform is fully responsive and works seamlessly on desktops, tablets, and mobile phones, making it accessible to administrators, teachers, students, and parents from any device.',
    },
    {
      question: 'How secure is the platform?',
      answer:
        "Security is our top priority. We implement industry-standard encryption, regular security audits, role-based access controls, comprehensive audit logging, and comply with data protection regulations to ensure your school's data remains safe.",
    },
  ]

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl divide-y divide-slate-200">
          {displayFaqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-start justify-between text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold leading-7 text-slate-900">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-slate-400"
                    >
                      <path d="M5 12h14"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-slate-400"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-2 pr-12">
                  <p className="text-base leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
