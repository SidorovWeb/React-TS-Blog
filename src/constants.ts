export const defaultPost = {
  author: '',
  authorPhoto: '',
  title: '',
  slug: '',
  categories: [],
  previewImage: {
    url: '',
    fileLocated: '',
  },
  timestamp: '',
  excerpt: '',
  content: '',
  id: '',
  uid: '',
  status: '',
}

export const defaultUser = {
  userName: '',
  email: '',
  // timestamp: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(),
  timestamp: '',
  id: '',
  uid: '',
  userPhoto: {
    url: '',
    fileLocated: '',
  },
  status: '',
  notification: [],
}
