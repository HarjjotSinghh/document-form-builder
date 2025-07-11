'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, User, Wrench } from 'lucide-react';
import ThemeToggle from '../ui/theme-toggle';

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 px-4 sticky top-0 z-50">
      <div className=" flex py-4 tems-center justify-between max-w-7xl mx-auto">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wrench className="h-6 w-6" />
            <span className="hidden font-bold lg:inline-block">
              Document Form Builder
            </span>
          </Link>
        </div>
        <nav className="flex items-center lg:space-x-2 space-x-4 text-sm font-medium">
          {/* <Button variant="light" size="default" asChild>
            <Link href="/">
              <Home className="h-4 w-4 lg:mr-1 mr-0" />
              <span className='hidden lg:inline-block'>Home</span>
            </Link>
          </Button> */}
          <Button variant="light" size="default" asChild>
            <Link href="/create">
              <Wrench className="h-4 w-4 lg:mr-1 mr-0" />
              <span className='hidden lg:inline-block'>Form Builder</span>
            </Link>
          </Button>
          <Button variant="light" size="default" asChild>
            <Link href="https://harjot.co" target="_blank" rel="noopener noreferrer">
              <User className="h-4 w-4 lg:mr-1 mr-0" />
              <span className='hidden lg:inline-block'>About Me</span>
            </Link>
          </Button>
          <Button variant="light" size="default" asChild>
            <Link 
              href="https://github.com/HarjjotSinghh/document-form-builder" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 lg:mr-1 mr-0" />
              <span className='hidden lg:inline-block'>GitHub</span>
            </Link>
          </Button>
          <ThemeToggle />
        </nav>

      </div>
    </header>
  );
} 