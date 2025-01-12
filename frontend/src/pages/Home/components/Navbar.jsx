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
      <nav className="flex items-center justify-between p-4 border-b md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between md:space-x-4 md:p-6 md:px-4 lg:px-8">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-[50px] h-[50px] rounded-lg cursor-pointer md:w-[70px] md:h-[70px]"
            />
          </Link>
          <Input
            type="search"
            placeholder="Search high-resolution images"
            className="w-full h-[40px] md:w-[300px] md:h-[50px]"
          />
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          {!user && (
            <>
              <Link to="/login">
                <Button variant="ghost" className="md:hidden md:px-6 md:py-3">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="ghost" className="md:hidden md:px-6 md:py-3">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          {user && (
            <Link to="/profile">
              <Button className="md:hidden md:px-6 md:py-3">My Profile</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

