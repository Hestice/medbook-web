import Link from 'next/link'
import React from 'react'

export default function Navigation() {
  return (
   <header className="flex justify-center items-center py-4 lg:py-6 sticky top-0 bg-white/30 backdrop-blur-md border-b-2 border-gray-100">

      <nav className="bg-white shadow-md rounded-xl overflow-hidden">
        <ul className="flex divide-x divide-gray-100">
          {['Dashboard', 'Services', 'About', 'Contact'].map((item, index) => ( //TODO: refactor to use Enum as routes
            <li key={item} className={`flex-1 ${index === 0 ? 'rounded-l-xl' : ''} ${index === 3 ? 'rounded-r-xl' : ''}`}>
              <Link 
                href={`/${item.toLowerCase()}`} 
                className={`
                  text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                  px-6 py-2 text-sm font-medium transition duration-150 ease-in-out
                  h-full flex items-center justify-center
                `}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
