import React, { useState } from 'react'

interface Screenshot {
  src: string
  alt: string
  caption?: string
}

interface ScreenshotsProps {
  title?: string
  subtitle?: string
  images?: Screenshot[]
  backgroundClass?: string
}

const Screenshots: React.FC<ScreenshotsProps> = ({
  title = 'Experience our intuitive interface',
  subtitle = 'Clean, modern design built for educators and administrators',
  images = [],
  backgroundClass = 'bg-white',
}) => {
  // Default screenshots if none are provided
  const defaultImages: Screenshot[] = [
    {
      src: '/images/dashboard-screenshot.png',
      alt: 'Dashboard interface',
      caption:
        'Centralized dashboard providing an overview of key metrics and activities',
    },
    {
      src: '/images/student-management-screenshot.png',
      alt: 'Student management interface',
      caption:
        'Comprehensive student profiles with academic and personal information',
    },
    {
      src: '/images/timetable-screenshot.png',
      alt: 'Timetable management interface',
      caption: 'Visual timetable scheduler with drag-and-drop functionality',
    },
    {
      src: '/images/finance-screenshot.png',
      alt: 'Financial management interface',
      caption: 'Detailed financial reporting and fee management tools',
    },
    {
      src: '/images/academic-screenshot.png',
      alt: 'Academic management interface',
      caption: 'Curriculum planning and assessment management interface',
    },
  ]

  const displayImages = images.length > 0 ? images : defaultImages
  const [activeIndex, setActiveIndex] = useState(0)

  const nextImage = () => {
    setActiveIndex((current) => (current + 1) % displayImages.length)
  }

  const prevImage = () => {
    setActiveIndex(
      (current) => (current - 1 + displayImages.length) % displayImages.length,
    )
  }

  const goToImage = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className={`py-16 sm:py-24 ${backgroundClass}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* Main image */}
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 shadow-xl ring-1 ring-slate-200">
              {/* This would be a real screenshot in production */}
              <div className="relative h-full w-full">
                {displayImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="bg-slate-200 h-full w-full flex items-center justify-center">
                      {/* In a real app, this would be an actual image */}
                      <p className="text-slate-500 text-lg">{image.alt}</p>
                      {/* Replace with real image in production */}
                      {/* <img 
                        src={image.src} 
                        alt={image.alt}
                        className="h-full w-full object-cover" 
                      /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption */}
            {displayImages[activeIndex].caption && (
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-500">
                  {displayImages[activeIndex].caption}
                </p>
              </div>
            )}

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Previous image"
            >
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
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Next image"
            >
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
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>

          {/* Dots navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`h-2 w-2 rounded-full ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-slate-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Screenshots
