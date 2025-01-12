import { Input } from '@/components/components/ui/input'
import logo from '../../../assets/unsplash-logo.jpeg'

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/components/ui/button'
import { useUserStore } from '../../../Store/useUserStore'

const Navbar = () => {
  const { user } = useUserStore();

  return (
    <>
      <nav className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-[50px] h-[50px] rounded-lg cursor-pointer"
            />
          </Link>
          <Input
            type="search"
            placeholder="Search high-resolution images"
            className="w-[140vh] h-[40px]"
          />
        </div>
        <div className="flex items-center space-x-4">
          {!user && (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="ghost">Sign up</Button>
              </Link>
            </>
          )}
          {user && (
            <Link to="/profile">
              <Button>My Profile</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

