import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const profileStore = useProfileStore()

  if (authStore.isAuthenticated) return

  try {
    const session = JSON.parse(localStorage.getItem('mock_session') || 'null')
    if (!session?.userId || !session?.token) return

    const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
    const found = users.find((u: { id: string }) => u.id === session.userId)
    if (!found) return

    const { password: _, ...user } = found
    authStore.setUser(user, session.token)

    const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '{}')
    if (profiles[session.userId]) {
      const gallery = JSON.parse(localStorage.getItem(`mock_gallery_${session.userId}`) || '[]')
      profileStore.setProfile({ ...profiles[session.userId], favoriteImages: gallery })
    }
  } catch {
    // Ignore parse errors
  }
})
