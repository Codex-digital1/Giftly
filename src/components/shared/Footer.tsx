import React from 'react';
import { IoMdGift } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <div>
            <div>
            <footer className="w-full ">
                <div className="mx-auto max-w-6xl px-4  sm:px-6 ">

                    <div className="flex justify-between flex-col py-14 gap-14 lg:gap-20 min-[1124px]:flex-row">
                        <div className="block  xl:max-w-lg">
                           <Link to={"/"} className='flex items-center text-primary'>
                           <IoMdGift className="md:text-4xl text-xl font-bold" />
                           <h1 className="md:text-2xl font-bold">Giftly</h1>
                           </Link>
                            <p className="text-lg text-gray-500 mb-12 text-center min-[1124px]:text-left">Trusted in more than 100 countries & 5 million customers. </p>
                            <div className="relative  flex-row gap-3  flex items-center justify-between max-[1124px]:max-w-2xl max-[1124px]:mx-auto ">
                                <span className="absolute  left-5 top-4 lg:top-5"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.25201 4L7.15881 7.89529C9.26862 9.16117 10.3235 9.79412 11.4825 9.76654C12.6416 9.73896 13.6652 9.05656 15.7124 7.69175L20.748 4M9 17H13C16.7712 17 18.6569 17 19.8284 15.8284C21 14.6569 21 12.7712 21 9C21 5.22876 21 3.34315 19.8284 2.17157C18.6569 1 16.7712 1 13 1H9C5.22876 1 3.34315 1 2.17157 2.17157C1 3.34315 1 5.22876 1 9C1 12.7712 1 14.6569 2.17157 15.8284C3.34315 17 5.22876 17 9 17Z" stroke="#ff4d6d"  />
                                </svg>
                                </span>
                                <input type="text" name="email" className="py-3 px-5 h-14 pl-14 border border-gray-300 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none flex-1 w-full " placeholder="Contact" />
                                <button type="submit" className="h-14 py-3.5 px-7 bg-primary transition-all duration-500 shadow-md rounded-full text-white font-semibold">Subscribe</button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center sm:items-start min-[530px]:flex-row max-[1124px]:w-full max-[1124px]:justify-between gap-12 xl:gap-24 max-[1124px]:max-w-2xl max-[1124px]:mx-auto">
                            <div className="block">
                                <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">Pagedone</h4>
                                <ul className="grid gap-6 text-center lg:text-left">
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Home</a></li>
                                    <li><Link to={"/allGift"} className="text-gray-600 hover:text-gray-900">All Gift</Link></li>
                                    <li><Link to={"/aboutUs"} className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                                    
                                </ul>
                            </div>
                            <div className="block">
                                <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">Products</h4>
                                <ul className="grid gap-6 text-center lg:text-left" >
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Figma UI System</a></li>
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Icons Assets</a></li>
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Responsive Blocks</a></li>
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Components Library</a></li>
                                </ul>
                            </div>
                            <div className="block">
                                <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">Support</h4>
                                <ul className="grid gap-6 text-center lg:text-left">
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Customer Support</a></li>
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">License</a></li>
                                    <li><a href="" className="text-gray-600 hover:text-gray-900">Terms & Conditions</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="py-9 border-t border-gray-200">
                        <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 sm:flex-row sm:justify-between">
                            <span className="text-sm text-gray-500 ">©<a href="https://pagedone.io/">pagedone</a>2024, All rights reserved.</span>
                            <div className="flex  space-x-6 sm:justify-center ">
                                <a href="" className="group flex justify-center items-center ">
                                    <svg className="text-gray-700 group-hover:text-indigo-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Social Media">
                                            <path id="Vector" d="M11.8214 9.81691L16.9919 3.93591H15.7667L11.2772 9.0423L7.6914 3.93591H3.55566L8.97803 11.6577L3.55566 17.8248H4.78097L9.522 12.4323L13.3088 17.8248H17.4446L11.8211 9.81691H11.8214ZM10.1432 11.7257L9.59382 10.9568L5.22246 4.83846H7.10445L10.6322 9.77615L11.1816 10.5451L15.7672 16.9633H13.8852L10.1432 11.726V11.7257Z" fill="currentColor" />
                                        </g>
                                    </svg>


                                </a>
                                <a href="" className="group flex justify-center items-center ">
                                    <svg className="w-[1.25rem] h-[1.125rem] text-gray-700 group-hover:text-indigo-600" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.70975 7.93663C4.70975 6.65824 5.76102 5.62163 7.0582 5.62163C8.35537 5.62163 9.40721 6.65824 9.40721 7.93663C9.40721 9.21502 8.35537 10.2516 7.0582 10.2516C5.76102 10.2516 4.70975 9.21502 4.70975 7.93663ZM3.43991 7.93663C3.43991 9.90608 5.05982 11.5025 7.0582 11.5025C9.05658 11.5025 10.6765 9.90608 10.6765 7.93663C10.6765 5.96719 9.05658 4.37074 7.0582 4.37074C5.05982 4.37074 3.43991 5.96719 3.43991 7.93663ZM9.97414 4.22935C9.97408 4.39417 10.0236 4.55531 10.1165 4.69239C10.2093 4.82946 10.3413 4.93633 10.4958 4.99946C10.6503 5.06259 10.8203 5.07916 10.9844 5.04707C11.1484 5.01498 11.2991 4.93568 11.4174 4.81918C11.5357 4.70268 11.6163 4.55423 11.649 4.39259C11.6817 4.23095 11.665 4.06339 11.6011 3.91109C11.5371 3.7588 11.4288 3.6286 11.2898 3.53698C11.1508 3.44536 10.9873 3.39642 10.8201 3.39635H10.8197C10.5955 3.39646 10.3806 3.48424 10.222 3.64043C10.0635 3.79661 9.97434 4.00843 9.97414 4.22935ZM4.21142 13.5892C3.52442 13.5584 3.15101 13.4456 2.90286 13.3504C2.57387 13.2241 2.33914 13.0738 2.09235 12.8309C1.84555 12.588 1.69278 12.3569 1.56527 12.0327C1.46854 11.7882 1.3541 11.4201 1.32287 10.7431C1.28871 10.0111 1.28189 9.79119 1.28189 7.93669C1.28189 6.08219 1.28927 5.86291 1.32287 5.1303C1.35416 4.45324 1.46944 4.08585 1.56527 3.84069C1.69335 3.51647 1.84589 3.28513 2.09235 3.04191C2.3388 2.79869 2.57331 2.64813 2.90286 2.52247C3.1509 2.42713 3.52442 2.31435 4.21142 2.28358C4.95417 2.24991 5.17729 2.24319 7.0582 2.24319C8.9391 2.24319 9.16244 2.25047 9.90582 2.28358C10.5928 2.31441 10.9656 2.42802 11.2144 2.52247C11.5434 2.64813 11.7781 2.79902 12.0249 3.04191C12.2717 3.2848 12.4239 3.51647 12.552 3.84069C12.6487 4.08513 12.7631 4.45324 12.7944 5.1303C12.8285 5.86291 12.8354 6.08219 12.8354 7.93669C12.8354 9.79119 12.8285 10.0105 12.7944 10.7431C12.7631 11.4201 12.6481 11.7881 12.552 12.0327C12.4239 12.3569 12.2714 12.5882 12.0249 12.8309C11.7784 13.0736 11.5434 13.2241 11.2144 13.3504C10.9663 13.4457 10.5928 13.5585 9.90582 13.5892C9.16306 13.6229 8.93994 13.6296 7.0582 13.6296C5.17645 13.6296 4.95395 13.6229 4.21142 13.5892ZM4.15307 1.03424C3.40294 1.06791 2.89035 1.18513 2.4427 1.3568C1.9791 1.53408 1.58663 1.77191 1.19446 2.1578C0.802277 2.54369 0.56157 2.93108 0.381687 3.38797C0.207498 3.82941 0.0885535 4.3343 0.0543922 5.07358C0.0196672 5.81402 0.0117188 6.05074 0.0117188 7.93663C0.0117188 9.82252 0.0196672 10.0592 0.0543922 10.7997C0.0885535 11.539 0.207498 12.0439 0.381687 12.4853C0.56157 12.9419 0.802334 13.3297 1.19446 13.7155C1.58658 14.1012 1.9791 14.3387 2.4427 14.5165C2.89119 14.6881 3.40294 14.8054 4.15307 14.839C4.90479 14.8727 5.1446 14.8811 7.0582 14.8811C8.9718 14.8811 9.212 14.8732 9.96332 14.839C10.7135 14.8054 11.2258 14.6881 11.6737 14.5165C12.137 14.3387 12.5298 14.1014 12.9219 13.7155C13.3141 13.3296 13.5543 12.9419 13.7347 12.4853C13.9089 12.0439 14.0284 11.539 14.062 10.7997C14.0962 10.0587 14.1041 9.82252 14.1041 7.93663C14.1041 6.05074 14.0962 5.81402 14.062 5.07358C14.0278 4.33424 13.9089 3.82913 13.7347 3.38797C13.5543 2.93135 13.3135 2.5443 12.9219 2.1578C12.5304 1.7713 12.137 1.53408 11.6743 1.3568C11.2258 1.18513 10.7135 1.06735 9.96388 1.03424C9.21256 1.00058 8.97236 0.992188 7.05876 0.992188C5.14516 0.992188 4.90479 1.00002 4.15307 1.03424Z" fill="currentColor"></path>
                                    </svg>

                                </a>
                                <a href="" className="group flex justify-center items-center ">
                                    <svg className="w-[1rem] h-[1rem] text-gray-700 group-hover:text-indigo-600" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.8794 11.5527V3.86835H0.318893V11.5527H2.87967H2.8794ZM1.59968 2.81936C2.4924 2.81936 3.04817 2.2293 3.04817 1.49188C3.03146 0.737661 2.4924 0.164062 1.61666 0.164062C0.74032 0.164062 0.167969 0.737661 0.167969 1.49181C0.167969 2.22923 0.723543 2.8193 1.5829 2.8193H1.59948L1.59968 2.81936ZM4.29668 11.5527H6.85698V7.26187C6.85698 7.03251 6.87369 6.80255 6.94134 6.63873C7.12635 6.17968 7.54764 5.70449 8.25514 5.70449C9.18141 5.70449 9.55217 6.4091 9.55217 7.44222V11.5527H12.1124V7.14672C12.1124 4.78652 10.8494 3.68819 9.16483 3.68819C7.78372 3.68819 7.17715 4.45822 6.84014 4.98267H6.85718V3.86862H4.29681C4.33023 4.5895 4.29661 11.553 4.29661 11.553L4.29668 11.5527Z" fill="currentColor"></path>
                                    </svg>

                                </a>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        </div>
    );
};

export default Footer;