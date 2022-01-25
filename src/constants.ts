import { Timestamp } from 'firebase/firestore'

export const defaultPost = {
  author: '',
  authorPhoto: '',
  title: '',
  slug: '',
  categories: [],
  previewImage: '',
  timestamp: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(),
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
  notification: [],
}
