import React from 'react'

interface Testimonial {
  content: string
  author: string
  role: string
  avatar?: string
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title = 'What Our Users Say',
  subtitle = 'Schools across the country trust our platform to streamline their operations',
  testimonials = [],
}) => {
  // Default testimonials if none are provided
  const defaultTestimonials: Testimonial[] = [
    {
      content:
        'The CBC School Management System has completely transformed how we handle our academic processes. The comprehensive assessment tracking has made CBC implementation so much easier.',
      author: 'Sarah Mwangi',
      role: 'Principal, Nairobi Academy',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    {
      content:
        'As a teacher, I appreciate how easy it is to track student performance and communicate with parents. The interface is intuitive and saves me hours every week on administrative tasks.',
      author: 'David Kimani',
      role: 'Grade 5 Teacher, Sunshine School',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    },
    {
      content:
        "The financial management module has streamlined our fee collection process. We've reduced payment delays by 70% since implementing this system.",
      author: 'Jane Omondi',
      role: 'Accountant, Heritage Academy',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    },
  ]

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>

        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex gap-x-4 gap-y-6">
                  <div className="flex-auto">
                    <div className="text-sm leading-6 text-slate-600 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </div>
                    <div className="mt-6 flex items-center gap-x-4">
                      {testimonial.avatar && (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="h-10 w-10 rounded-full bg-slate-50 object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-slate-900">
                          {testimonial.author}
                        </div>
                        <div className="text-sm leading-6 text-slate-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
