
import React from 'react'

const Footer = () => {
    return (
        <footer className="max-w-6xl bg-no-repeat bg-cover  mx-auto text-white pt-30 px-6 md:px-20" style={{ backgroundImage: "url('./hero/bg-lines.png')" }}>

            <div className=" m-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Quick Links */}
                <div className='ml-8'>
                    <h3 className="font-semibold text-lg  mb-4">Quick Links</h3>
                    <ul className="space-y-2 font-light text-gray-400">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className='font-light'>
                    <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                    <p className="text-gray-400">Email: contact@gainly.com</p>
                    <p className="text-gray-400 mt-1">Phone: +91 7345676890</p>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 font-light text-gray-400 text-xl">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="font-light mt-10 text-center text-sm text-gray-500">
                © 2025 Gainly. All rights reserved.
            </div>

        </footer>

    )
}

export default Footer
