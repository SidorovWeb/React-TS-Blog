import { serverTimestamp } from 'firebase/firestore'

export const defaultPost = {
  author: '',
  authorPhoto: '',
  title: '',
  slug: '',
  categories: [],
  previewImage: '',
  timestamp: serverTimestamp(),
  excerpt: '',
  content: '',
  id: '',
  status: '',
}
