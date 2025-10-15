
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const SocialIcon = ({ d }: { d: string }) => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-secondary border-t border-gray-700">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-accent"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg>
              <span className="text-2xl font-bold text-white">Mountain Challenger</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Crafting unforgettable adventures in the heart of the Karakoram since 199 Challenger. Your journey to the giants begins here.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brand-accent"><SocialIcon d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.5 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-accent"><SocialIcon d="M12.012 2.002c-5.517 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.998 9.998 9.998 5.518 0 9.998-4.48 9.998-9.998 0-5.517-4.48-9.998-9.998-9.998zm0 1.5c4.69 0 8.498 3.808 8.498 8.498s-3.808 8.498-8.498 8.498-8.498-3.808-8.498-8.498 3.808-8.498 8.498-8.498zm-1.838 3.996c-.19 0-.379.035-.562.105-.441.162-.601.688-.439 1.129l1.192 3.193-3.191-1.191c-.441-.164-.967 0-1.129.441-.162.441 0 .967.439 1.129l3.434 1.284 1.283 3.434c.164.441.688.602 1.129.439.441-.162.602-.688.439-1.129l-1.19-3.193 3.192 1.193c.441.162.967-.002 1.129-.441.162-.441-.002-.967-.439-1.129l-3.435-1.285-1.284-3.434c-.126-.334-.43-.541-.772-.541z" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-accent"><SocialIcon d="M2.002 12.002c0 5.518 4.48 9.998 9.998 9.998 5.517 0 9.998-4.48 9.998-9.998S17.517 2.004 12 2.004c-5.518 0-9.998 4.48-9.998 9.998zm5.998-4.5h2v-2.5c0-2.481 2.019-4.5 4.5-4.5h2.5v2h-2.5c-1.379 0-2.5 1.121-2.5 2.5v2.5h5l-.5 2h-4.5v10h-2V9.502h-2v-2z" /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-white">Quick Links</p>
              <nav className="mt-4 flex flex-col space-y-2">
                {NAV_LINKS.map(link => (
                  <Link key={link.path} to={link.path} className="text-gray-400 transition hover:text-brand-accent">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="font-semibold text-white">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2">
                <a href="#" className="text-gray-400 transition hover:text-brand-accent">Terms & Conditions</a>
                <a href="#" className="text-gray-400 transition hover:text-brand-accent">Privacy Policy</a>
                <a href="#" className="text-gray-400 transition hover:text-brand-accent">Booking Policy</a>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-white">Contact Us</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-gray-400">Email: info@mountainchallenger.com</li>
                <li className="text-gray-400">Phone: +92 123 4567890</li>
                <li className="text-gray-400">Address: Skardu, Gilgit-Baltistan, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mountain Challenger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
