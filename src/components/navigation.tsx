'use client'
import { useCurrentUser } from '@/hooks/use-current-user'
import Link from 'next/link'
import React from 'react'
import { Role } from '@/enums/role'
import { Route } from '@/enums/route'
import { logout } from '@/services/logout-service'

export default function Navigation() {
  const { user, loading } = useCurrentUser()

  const defaultRoutes = [Route.Home, Route.Services, Route.About, Route.Contact]
  const doctorRoutes = [Route.Dashboard, Route.Profile, Route.Schedule, Route.Appointments, Route.Logout]
  const patientRoutes = [Route.Dashboard, Route.Profile, Route.Appointments, Route.Logout]

  let navItems = defaultRoutes
  if (user?.role === Role.Doctor) {
    navItems = doctorRoutes
  } else if (user?.role === Role.Patient) {
    navItems = patientRoutes
  }

  if (loading) return

  return (
    <header className="flex justify-center items-center py-4 lg:py-6 sticky top-0 bg-white/30 backdrop-blur-md border-b-2 border-gray-100">
      <nav className="bg-white shadow-md rounded-xl overflow-hidden">
        <ul className="flex divide-x divide-gray-100">
          {navItems.map((item, index) => (
            <li key={item} className={`flex-1 ${index === 0 ? 'rounded-l-xl' : ''} ${index === navItems.length - 1 ? 'rounded-r-xl' : ''}`}>
              {item === Route.Logout ? (
                <button
                  onClick={logout}
                  className={`
                    text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                    px-6 py-2 text-sm font-medium transition duration-150 ease-in-out
                    h-full flex items-center justify-center w-full
                  `}
                >
                  {item}
                </button>
              ) : item === Route.Home ? (
                <Link
                  href="/"
                  className={`
                    text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                    px-6 py-2 text-sm font-medium transition duration-150 ease-in-out
                    h-full flex items-center justify-center
                  `}
                >
                  {item}
                </Link>
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
