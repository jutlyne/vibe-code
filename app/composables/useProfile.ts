import type { Profile, UpdateProfilePayload } from '~/types/user'
import type { ImageFile } from '~/types/image'
import { useProfileStore } from '~/stores/profile'
import { useAuth } from '~/composables/useAuth'

const MOCK_PROFILES_KEY = 'mock_profiles'

function getMockProfiles(): Record<string, Omit<Profile, 'favoriteImages'> & { favoriteImages: ImageFile[] }> {
  if (import.meta.server) return {}
  try {
    return JSON.parse(localStorage.getItem(MOCK_PROFILES_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveMockProfiles(profiles: Record<string, Profile>) {
  localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(profiles))
}

export function useProfile() {
  const profileStore = useProfileStore()
  const { getUserById } = useAuth()

  // TODO: replace mock → GET /api/profile/:id
  async function fetchProfile(userId: string): Promise<Profile> {
    await new Promise(r => setTimeout(r, 200))

    const profiles = getMockProfiles()
    if (profiles[userId]) {
      return profiles[userId] as Profile
    }

    const user = getUserById(userId)
    if (!user) throw new Error('Người dùng không tồn tại')

    const newProfile: Profile = {
      ...user,
      favoriteImages: [],
    }
    profiles[userId] = newProfile
    saveMockProfiles(profiles as Record<string, Profile>)
    return newProfile
  }

  // TODO: replace mock → PUT /api/profile/:id
  async function updateProfile(userId: string, payload: UpdateProfilePayload & { favoriteImages?: ImageFile[] }): Promise<Profile> {
    await new Promise(r => setTimeout(r, 300))

    const profiles = getMockProfiles()
    const current = profiles[userId]
    if (!current) throw new Error('Profile không tồn tại')

    const updated: Profile = {
      ...current,
      ...payload,
    } as Profile

    profiles[userId] = updated
    saveMockProfiles(profiles as Record<string, Profile>)

    const { updateMockUser } = useAuth()
    updateMockUser(userId, {
      fullName: updated.fullName,
      username: updated.username,
      phone: updated.phone,
      avatarUrl: updated.avatarUrl,
    })

    profileStore.setProfile(updated)
    return updated
  }

  return { fetchProfile, updateProfile }
}
