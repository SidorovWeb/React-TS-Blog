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
  uid: '',
  status: '',
}

export const defaultUser = {
  userName: '',
  email: '',
  timestamp: {},
  id: '',
  userPhoto: '',
  status: '',
  post_thumbnail: '',
  notification: [],
}
