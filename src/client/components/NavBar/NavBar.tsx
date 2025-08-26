// src/client/components/NavBar/NavBar.tsx
import React, { useEffect, useMemo, useState } from 'react'
import { LogIn, Menu } from 'lucide-react'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { useAuth } from 'wasp/client/auth'
import { Link as WaspRouterLink, routes } from 'wasp/client/router'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../../components/ui/sheet'
import { cn } from '../../../lib/utils'
import { throttleWithTrailingInvocation } from '../../../shared/utils'
import { UserDropdown } from '../../../user/UserDropdown'
import { UserMenuItems } from '../../../user/UserMenuItems'
import { useIsLandingPage } from '../../hooks/useIsLandingPage'
import logo from '../../static/logo.webp'
import DarkModeSwitcher from '../DarkModeSwitcher'
import { Announcement } from './Announcement'

export interface NavigationItem {
  name: string
  to: string
}

/** Toggle legacy marketing links */
const SHOW_MARKETING_LINKS = false

export default function NavBar ({ navigationItems }: { navigationItems: NavigationItem[] }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const isLandingPage = useIsLandingPage()
  const location = useLocation()

  useEffect(() => {
    const throttled = throttleWithTrailingInvocation(() => setIsScrolled(window.scrollY > 0), 50)
    window.addEventListener('scroll', throttled)
    return () => {
      window.removeEventListener('scroll', throttled)
      throttled.cancel()
    }
  }, [])

  const pageTitle = useMemo(() => {
    const p = location.pathname
    if (p.startsWith('/courses')) return 'Courses'
    if (p.startsWith('/scenic')) return 'Scenic & History'
    if (p.startsWith('/account')) return 'Account'
    if (p.startsWith('/pricing')) return 'Pricing'
    if (p.startsWith('/checkout')) return 'Checkout'
    return 'Home'
  }, [location.pathname])

  const TO_COURSES = routes.CoursesRoute.to as string
  const TO_SCENIC = routes.ScenicHubRoute.to as string

  return (
    <>
      {isLandingPage && <Announcement />}
      <header className={cn('sticky top-0 z-50 transition-all duration-300', isScrolled && 'top-4')}>
        <div
          className={cn('transition-all duration-300', {
            'mx-4 md:mx-20 pr-2 lg:pr-0 rounded-full shadow-lg bg-background/90 backdrop-blur-lg border border-border':
              isScrolled,
            'mx-0 bg-background/80 backdrop-blur-lg border-b border-border': !isScrolled
          })}
        >
          <nav
            className={cn('flex items-center justify-between transition-all duration-300', {
              'p-3 lg:px-6': isScrolled,
              'p-6 lg:px-8': !isScrolled
            })}
            aria-label="Global"
          >
            {/* Left: Logo */}
            <div className="flex items-center gap-4">
              <WaspRouterLink
                to={routes.Root.to}
                className="flex items-center text-foreground duration-300 ease-in-out hover:text-primary transition-colors"
              >
                <NavLogo isScrolled={isScrolled} />
                <span
                  className={cn('ml-2 font-semibold leading-6 text-foreground transition-all duration-300', {
                    'text-sm': !isScrolled,
                    'text-xs': isScrolled
                  })}
                >
                  Your SaaS
                </span>
              </WaspRouterLink>

              {SHOW_MARKETING_LINKS && (
                <ul className="hidden lg:flex items-center gap-6 ml-2">
                  {renderNavigationItems(navigationItems)}
                </ul>
              )}
            </div>

            {/* Middle: quick actions + current page title */}
            <div className="mx-2 hidden lg:flex items-center gap-3">
              <ReactRouterLink
                to={TO_COURSES}
                className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
              >
                Go to Courses
              </ReactRouterLink>
              <ReactRouterLink
                to={TO_SCENIC}
                className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
              >
                Explore Scenic &amp; History
              </ReactRouterLink>

              <div className="ml-3 text-sm text-muted-foreground select-none">{pageTitle}</div>
            </div>

            {/* Right: theme + user */}
            <div className="flex items-center gap-3">
              {/* 移动端固定显示的登录入口（已登录则自动隐藏） */}
              <NavBarMobileLoginPill />
              <NavBarMobileMenu
                isScrolled={isScrolled}
                navigationItems={navigationItems}
                toCourses={TO_COURSES}
                toScenic={TO_SCENIC}
              />
              {/* 桌面端固定：未登录显示 Log in，已登录显示用户菜单 */}
              <NavBarDesktopUserDropdown isScrolled={isScrolled} />
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

function NavBarDesktopUserDropdown ({ isScrolled }: { isScrolled: boolean }) {
  const { data: user } = useAuth() // 不使用 isLoading 来隐藏按钮
  const isAuthed = !!user

  return (
    <div className="hidden lg:flex lg:flex-1 gap-3 justify-end items-center">
      <ul className="flex justify-center items-center gap-2 sm:gap-4">
        <DarkModeSwitcher />
      </ul>

      {isAuthed ? (
        <div className="ml-3">
          <UserDropdown user={user!} />
        </div>
      ) : (
        <WaspRouterLink
          to={routes.LoginRoute.to}
          className={cn('font-semibold leading-6 ml-3 transition-all duration-300', {
            'text-sm': !isScrolled,
            'text-xs': isScrolled
          })}
        >
          <div className="flex items-center duration-300 ease-in-out text-foreground hover:text-primary transition-colors">
            Log in <LogIn size={isScrolled ? '1rem' : '1.1rem'} className="ml-1" />
          </div>
        </WaspRouterLink>
      )}
    </div>
  )
}

function NavBarMobileMenu ({
  isScrolled,
  navigationItems,
  toCourses,
  toScenic
}: {
  isScrolled: boolean
  navigationItems: NavigationItem[]
  toCourses: string
  toScenic: string
}) {
  const { data: user, isLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex lg:hidden">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-muted hover:bg-accent transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            <Menu
              className={cn('transition-all duration-300', {
                'size-8 p-1': !isScrolled,
                'size-6 p-0.5': isScrolled
              })}
            />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <WaspRouterLink to={routes.Root.to}>
                <span className="sr-only">Your SaaS</span>
                <NavLogo isScrolled={false} />
              </WaspRouterLink>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              {/* Quick actions */}
              <div className="py-6 space-y-2">
                <ReactRouterLink
                  to={toCourses}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium leading-7 hover:bg-accent hover:text-accent-foreground"
                >
                  Go to Courses
                </ReactRouterLink>
                <ReactRouterLink
                  to={toScenic}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium leading-7 hover:bg-accent hover:text-accent-foreground"
                >
                  Explore Scenic &amp; History
                </ReactRouterLink>
              </div>

              {/* Optional legacy marketing menu */}
              {SHOW_MARKETING_LINKS && (
                <ul className="space-y-2 py-6">
                  {renderNavigationItems(navigationItems, setMobileMenuOpen)}
                </ul>
              )}

              {/* User + Theme */}
              <div className="py-6">
                {!isLoading && user ? (
                  <div className="space-y-2">
                    <UserMenuItems user={user} onItemClick={() => setMobileMenuOpen(false)} />
                  </div>
                ) : null}
                <div className="mt-4">
                  <DarkModeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

/** 移动端右上角固定的小“Log in”药丸（登录后隐藏） */
function NavBarMobileLoginPill () {
  const { data: user } = useAuth()
  if (user) return null
  return (
    <WaspRouterLink
      to={routes.LoginRoute.to}
      className="lg:hidden rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent"
    >
      Log in
    </WaspRouterLink>
  )
}

function renderNavigationItems (
  navigationItems: NavigationItem[],
  setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const cls = setMobileMenuOpen
    ? 'block rounded-lg px-3 py-2 text-sm font-medium leading-7 hover:bg-accent hover:text-accent-foreground'
    : 'text-sm font-normal leading-6 hover:text-primary transition-colors'
  return navigationItems.map((item) => (
    <li key={item.name}>
      <ReactRouterLink
        to={item.to}
        className={cls}
        onClick={setMobileMenuOpen ? () => setMobileMenuOpen(false) : undefined}
      >
        {item.name}
      </ReactRouterLink>
    </li>
  ))
}

const NavLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <img
    className={cn('transition-all duration-500', { 'size-8': !isScrolled, 'size-7': isScrolled })}
    src={logo}
    alt="Your SaaS App"
  />
)
