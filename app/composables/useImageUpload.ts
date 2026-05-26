import type { ImageFile } from '~/types/image'

const MOCK_GALLERY_PREFIX = 'mock_gallery_'
const MOCK_AVATAR_PREFIX = 'mock_avatar_'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function useImageUpload() {
  // TODO: replace mock → POST /api/upload/avatar (returns CDN URL)
  async function uploadAvatar(userId: string, file: File): Promise<string> {
    const base64 = await fileToBase64(file)
    localStorage.setItem(`${MOCK_AVATAR_PREFIX}${userId}`, base64)
    return base64
  }

  function getStoredAvatar(userId: string): string | null {
    if (import.meta.server) return null
    return localStorage.getItem(`${MOCK_AVATAR_PREFIX}${userId}`)
  }

  function getStoredGallery(userId: string): ImageFile[] {
    if (import.meta.server) return []
    try {
      return JSON.parse(localStorage.getItem(`${MOCK_GALLERY_PREFIX}${userId}`) || '[]')
    } catch {
      return []
    }
  }

  function saveGallery(userId: string, images: ImageFile[]) {
    localStorage.setItem(`${MOCK_GALLERY_PREFIX}${userId}`, JSON.stringify(images))
  }

  // TODO: replace mock → POST /api/upload/image (returns CDN URL)
  async function uploadGalleryImage(userId: string, file: File): Promise<ImageFile> {
    const base64 = await fileToBase64(file)
    const imageFile: ImageFile = {
      id: generateId(),
      localUrl: base64,
      serverUrl: base64,
    }

    const gallery = getStoredGallery(userId)
    saveGallery(userId, [...gallery, imageFile])
    return imageFile
  }

  // TODO: replace mock → DELETE /api/upload/image/:id
  function removeGalleryImage(userId: string, imageId: string): ImageFile[] {
    const gallery = getStoredGallery(userId)
    const updated = gallery.filter(img => img.id !== imageId)
    saveGallery(userId, updated)
    return updated
  }

  return {
    uploadAvatar,
    getStoredAvatar,
    getStoredGallery,
    uploadGalleryImage,
    removeGalleryImage,
  }
}
