export interface NavItem {
  label: string
  to: string
  icon: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', icon: 'lucide:house' },
  { label: 'About', to: '/about', icon: 'lucide:user' },
  { label: 'Projects', to: '/project', icon: 'lucide:folder-kanban' },
  { label: 'Resume', to: '/resume', icon: 'lucide:file-text' },
]

export const GITHUB_PROFILE_URL = 'https://github.com/rofiqurrohman'
