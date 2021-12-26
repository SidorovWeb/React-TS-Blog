interface Categories {
  name: string
  slug: string
}

export interface IPostListProps {
  author: string
  authorPhoto: string
  title: string
  previewImage: string
  dateOfCreation: string
  content: string
  excerpt: string
  slug: string
  categories: Categories[]
  id: number
}
