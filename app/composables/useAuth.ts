import type { User, RegisterPayload } from '~/types/user'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

const MOCK_USERS_KEY = 'mock_users'
const MOCK_SESSION_KEY = 'mock_session'

interface MockUser extends User {
  password: string
}

function getMockUsers(): MockUser[] {
  if (import.meta.server) return []
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveMockUsers(users: MockUser[]) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useAuth() {
  const authStore = useAuthStore()
  const profileStore = useProfileStore()

  // TODO: replace mock → POST /api/auth/register
  async function register(payload: RegisterPayload): Promise<{ user: User; token: string }> {
    await new Promise(r => setTimeout(r, 400))

    const users = getMockUsers()
    if (users.find(u => u.email === payload.email)) {
      throw new Error('Email này đã được đăng ký')
    }
    if (users.find(u => u.username === payload.username)) {
      throw new Error('Username này đã tồn tại')
    }

    const newUser: MockUser = {
      id: generateId(),
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      username: payload.username,
      phone: payload.phone,
      avatarUrl: undefined,
    }

    saveMockUsers([...users, newUser])

    const token = generateId()
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ userId: newUser.id, token }))

    const { password: _, ...user } = newUser
    return { user, token }
  }

  // TODO: replace mock → POST /api/auth/login
  async function login(email: string, password: string): Promise<{ user: User; token: string }> {
    await new Promise(r => setTimeout(r, 400))

    const users = getMockUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Email hoặc mật khẩu không đúng')
    }

    const token = generateId()
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ userId: found.id, token }))

    const { password: _, ...user } = found
    return { user, token }
  }

  // TODO: replace mock → POST /api/auth/logout
  function logout() {
    if (import.meta.client) {
      localStorage.removeItem(MOCK_SESSION_KEY)
    }
    authStore.logout()
    profileStore.clearProfile()
    navigateTo('/login')
  }

  function getSession(): { userId: string; token: string } | null {
    if (import.meta.server) return null
    try {
      return JSON.parse(localStorage.getItem(MOCK_SESSION_KEY) || 'null')
    } catch {
      return null
    }
  }

  function getUserById(id: string): User | null {
    const users = getMockUsers()
    const found = users.find(u => u.id === id)
    if (!found) return null
    const { password: _, ...user } = found
    return user
  }

  function updateMockUser(userId: string, updates: Partial<User>) {
    const users = getMockUsers()
    const idx = users.findIndex(u => u.id === userId)
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates }
      saveMockUsers(users)
    }
  }

  return { register, login, logout, getSession, getUserById, updateMockUser }
}
