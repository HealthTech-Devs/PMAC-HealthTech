import { Fragment, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import Logo from '../images/ulm_academic_maroon_white.png';
import Cookies from 'js-cookie'
 
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarStudent({user, signOut}) {
  const [greetings, setGreetings] = useState(true);
  const firstName = user.attributes.name.split(' ')[0];
  const loggedUser = {
    name: firstName,
    email: user.attributes.email,
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
    const router = useRouter();

    // useEffect(() => {
    //   setTimeout(() => {
    //     setGreetings(false);
    //   }, 5000);
    // }, []);
  
    // // // update greetings based on current route
    // // useEffect(() => {
    // //   if (router.pathname === '/') {
    // //     handleGreetings();
    // //   } else {
    // //     setGreetings(false);
    // //   }
    // // }, [router.pathname]);

    // const handleGreetings = () => {
    //   setTimeout(() => {
    //     setGreetings(false)},
    //   5000);
    // }

    const handleSignOut = () => {
      //clearing local storage
      localStorage.clear();
      //clearing cookie session

      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.${user.username}.refreshToken`);
      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.${user.username}.accessToken`);
      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.LastAuthUser`);
      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.${user.username}.idToken`);
      
      signOut();
      router.push('/');
    }

    const handleUserNavClick = (e) => {
      e.preventDefault();
      if(e.target.textContent === 'Sign out'){
        handleSignOut();
      }
      else {
        router.push('/profile');
      }
    }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full p-3 bg-red">
        <Disclosure as="nav" >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                
                <Image src={Logo} className="w-[5rem] " alt="ULM Logo" />

                  <div className="hidden md:block">
                    <div className=" border-2 border-bogold rounded-full p-2 ml-4  flex items-center md:ml-6">
                        <div>
                          { greetings &&
                            <span className="font-bold italic h-6 w-6 text-0.5xl mr-3 text-gold">
                              Welcome {loggedUser.name} 
                            </span>
                          }
                        </div>
                        {/* Profile dropdown */}
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-12 w-12 rounded-full" src={loggedUser.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                       
                          <Menu.Items className="absolute right-0 z-5 mt-6 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-red ring-opacity-1 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}  onClick={(e) => handleUserNavClick(e)}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                        active ? 'bg-gray' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}

                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                       
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6 " aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
               
                <div className="mt-4 border-t  pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={loggedUser.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gold">{loggedUser.name}</div>
                      <div className="text-sm font-medium leading-none text-gold">{loggedUser.email}</div>
                    </div>
                    
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray hover:text-gold "
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        
      </div>
    </>
  )
}
