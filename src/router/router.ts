import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// Import page components with proper type annotations
const Home = () => import('@/pages/index.vue')
const About = () => import('@/pages/about.vue')
const Services = () => import('@/pages/services.vue')
const Ministries = () => import('@/pages/ministries.vue')
const Events = () => import('@/pages/events.vue')
const Contact = () => import('@/pages/contact.vue')
const Mission = () => import('@/pages/missionView.vue')
const OurBeliefs = () => import('@/pages/ourBeliefs.vue')
const Leadership = () => import('@/pages/leadershipView.vue')
const History = () => import('@/pages/historyView.vue')

// Import layout
const DefaultLayout = () => import('@/layouts/default.vue')

// Define routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Welcome - PBCM',
          description: 'Philippine Christian Bible Missionary - Welcome to our church community'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          title: 'About Us - PBCM',
          description: 'Learn about Philippine Christian Bible Missionary, our mission, and beliefs'
        }
      },
      {
        path: '/services',
        name: 'Services',
        component: Services,
        meta: {
          title: 'Services - PBCM',
          description: 'Join us for worship services, Bible study, and prayer meetings'
        }
      },
      {
        path: '/ministries',
        name: 'Ministries',
        component: Ministries,
        meta: {
          title: 'Ministries - PBCM',
          description: 'Discover our various ministries serving God and community'
        }
      },
      {
        path: '/events',
        name: 'Events',
        component: Events,
        meta: {
          title: 'Events - PBCM',
          description: 'Upcoming events, conferences, and special activities'
        }
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
          title: 'Contact Us - PBCM',
          description: 'Get in touch with Philippine Christian Bible Missionary'
        }
      },
      {
        path: '/mission',
        name: 'Mission',
        component: Mission,
        meta: {
          title: 'Our Mission - PBCM',
          description: 'Learn about the mission and vision of Philippine Christian Bible Missionary'
        }
      },
      {
        path: '/our-beliefs',
        name: 'OurBeliefs',
        component: OurBeliefs,
        meta: {
          title: 'Our Beliefs - PBCM',
          description: 'Discover the core beliefs and values of Philippine Christian Bible Missionary'
        }
      },
      {
        path: '/leadershipView',
        name: 'Leadership',
        component: Leadership,
        meta: {
          title: 'Leadership - PBCM',
          description: 'Meet the leadership team of Philippine Christian Bible Missionary'
        }
      },
      {
        path: '/historyView',
        name: 'History',
        component: History,
        meta: {
          title: 'History - PBCM',
          description: 'Learn about the history and journey of Philippine Christian Bible Missionary'
        }
      }
    ]
  },
  // Catch all 404 - redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update document title based on route meta
  if (to.meta?.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'PBCM - Philippine Christian Bible Missionary'
  }

  // Update meta description
  if (to.meta?.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string)
    }
  }

  next()
})

// Error handling for dynamic imports
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('pbcm:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('pbcm:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error('Router error:', err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('pbcm:dynamic-reload')
})

export default router
