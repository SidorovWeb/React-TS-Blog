import Image from '../images/img.webp'
import Pushkin from '../images/pushkin.webp'

export const formatDate = () => {
  const date = new Date()
  return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

export const uniqueList = (list: [], key: string) => [...new Set(list.flat().map((data) => data[key]))]
export const uniqueListOfObject = (list: [], key: string) => [
  ...new Map(list.flat().map((item) => [item[key], item])).values(),
]

export const myPostList = [
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Выучи VUE и React',
    slug: 'Learn-VUE-and-React',
    categories: [{ name: 'Web Development', slug: 'web-development' }],
    previewImage: Image,
    dateOfCreation: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: 1,
  },
  {
    author: 'Sasskaa',
    authorPhoto: Pushkin,
    title: 'Какой-то текст',
    slug: 'Some-text',
    categories: [
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Sports', slug: 'sports' },
      { name: 'Astronomy', slug: 'astronomy' },
    ],
    previewImage: Image,
    dateOfCreation: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: 4,
  },
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Молодец, не останавливайся!',
    slug: 'Well-done-dont-stop',
    categories: [{ name: 'Web Development', slug: 'web-development' }],
    previewImage: Image,
    dateOfCreation: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: 2,
  },
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Ты получишь свою работу!',
    slug: 'Youll-get-your-job',
    categories: [
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Education', slug: 'education' },
    ],
    previewImage: Image,
    dateOfCreation: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: 3,
  },
]
