import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className=" mt-10 max-w-6xl mx-auto p-8 grid grid-cols-2 md:grid-cols-4 gap-8 bg-gray-100 border-t border-gray-300">
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Unsplash</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/community" className="hover:underline">Community</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/history" className="hover:underline">History</Link></li>
            <li><Link to="/join-the-team" className="hover:underline">Join the team</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Community</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/become-a-contributor" className="hover:underline">Become a contributor</Link></li>
            <li><Link to="/topics" className="hover:underline">Topics</Link></li>
            <li><Link to="/collections" className="hover:underline">Collections</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Connect</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="https://twitter.com/unsplash" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
            <li><a href="https://www.facebook.com/unsplash/" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
            <li><a href="https://www.instagram.com/unsplash/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer


