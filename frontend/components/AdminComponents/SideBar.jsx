import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../Logo'

const SideBar = () => {
  return (
    <div className='flex flex-col w-full bg-accent justify-between'>
        <Link className='flex items-center justify-center w-full border-b p-9' href="/">
          <Logo width={96} height={32} />
        </Link>
        <div className='flex flex-col items-center p-9 gap-9 h-full'>
          {[
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/projects", label: "Projects" },
          { href: "/admin/tasks", label: "Tasks" },
          { href: "/admin/messages", label: "Messages" },
          { href: "/admin/blogs", label: "Blogs" },
        ].map(({ href, label }, i) => (
          <Link
            key={i}
            className={"w-full border p-4 rounded-2xl"}
            href={href}
          >
            <div className="text-center hover:text-white/50 transition-all duration-300 hover:scale-105 flex gap-2 ">
              {label}
            </div>
          </Link>
        ))}
        </div>
        <div>tabs</div>
    </div>
  )
}

export default SideBar