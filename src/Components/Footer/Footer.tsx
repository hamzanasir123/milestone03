import { ChevronRight } from 'lucide-react'
import React from 'react'
import Tooltip from '../Tooltip/Tooltip'

export function FooterOne() {
  return (
    <footer className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-0">
      </div>
      <hr className="my-8" />
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
        <div className="w-full px-4 md:w-1/2 lg:px-0 mt-16">
          <Tooltip/>
          <h1 className="max-w-sm text-3xl font-bold">Subscribe to our Channels</h1>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 ">Company</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium mb-6 text-gray-500">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
                <li>Press Release</li>
                <br/>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
