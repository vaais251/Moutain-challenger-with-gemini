
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const MountainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-accent">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
);

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180">
        <path d="m6 9 6 6 6-6"></path>
    </svg>
);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeLinkStyle = {
        color: '#FFC300',
        textShadow: '0 0 5px #FFC300'
    };
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-primary/80 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center gap-2">
                            <MountainIcon />
                            <span className="text-xl font-bold tracking-wider text-white">Mountain Challenger</span>
                        </NavLink>
                    </div>
                    <nav className="hidden md:flex md:items-center md:gap-8">
                        {NAV_LINKS.map((link) => (
                            link.dropdown ? (
                                <div key={link.label} className="group relative">
                                    <button className="flex items-center gap-1 font-medium text-brand-light transition-colors hover:text-brand-accent">
                                        {link.label} <ChevronDown />
                                    </button>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 origin-top-right rounded-md bg-brand-secondary shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="py-1">
                                            {link.dropdown.map(item => (
                                                <Link key={item.path} to={item.path} className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-primary hover:text-brand-accent">
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    style={({ isActive }) => isActive ? activeLinkStyle : {}}
                                    className="font-medium text-brand-light transition-colors hover:text-brand-accent"
                                >
                                    {link.label}
                                </NavLink>
                            )
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center rounded-md p-2 text-brand-light hover:bg-brand-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-brand-secondary">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {NAV_LINKS.flatMap((link) => link.dropdown ? link.dropdown : link).map((link) => (
                             <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                                className="block rounded-md px-3 py-2 text-base font-medium text-brand-light hover:bg-brand-primary hover:text-brand-accent"
                            >
                                {link.path.startsWith('/') ? link.label : `- ${link.label}`}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
