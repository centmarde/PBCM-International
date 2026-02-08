/* --------------------------------
   NAV ITEMS (NO LOGIN/PROFILE HERE - HANDLED SEPARATELY)
-------------------------------- */
export type NavItem = {
  label: string
  to: string
  icon?: string
}

export function useNavbarItems() {
  const navItems: NavItem[] = [
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Ministries', to: '/ministries' },
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
  ]

  return { navItems }
}
