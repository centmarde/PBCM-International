import { ref } from 'vue'

/* --------------------------------
   MOBILE DRAWER
-------------------------------- */
export function useNavbarDrawer() {
  const drawer = ref(false)
  const toggleDrawer = () => (drawer.value = !drawer.value)
  const closeDrawer = () => (drawer.value = false)

  return { drawer, toggleDrawer, closeDrawer }
}
