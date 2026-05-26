export interface User {
  id: string
  email: string
  fullName: string
  username: string
  phone?: string
  avatarUrl?: string
}

export interface RegisterPayload {
  email: string
  password: string
  fullName: string
  username: string
  phone?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface UpdateProfilePayload {
  fullName?: string
  username?: string
  phone?: string
  avatarUrl?: string
}

export interface Profile extends User {
  favoriteImages: ImageFile[]
}

import type { ImageFile } from './image'
