import React from 'react'

function NavBar() {
  return (
    <nav className="w-full bg-slate-300 border-b border-slate-200 shadow-sm px-4 py-3 flex justify-center items-center">
  <div className="flex items-center justify-center">
    <a href="/" className="px-4 py-2 text-xl font-bold text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
      Perpustakaan Digital BPVP
    </a>
  </div>
</nav>
  )
}

export default NavBar;
