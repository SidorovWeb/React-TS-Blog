import Image from '../images/img.webp'
import Code from '../images/code.webp'
import Css from '../images/css.webp'
import Js from '../images/JS.webp'
import Apple from '../images/apple.webp'
import Pushkin from '../images/pushkin.webp'
import Smile from '../images/smile.webp'

export const statusColor = (statusPost: string) => {
  switch (statusPost) {
    case 'published':
      return '#16A34A'
    case 'pending':
      return '#EAB308'
    case 'rejected':
      return '#EF4444'
    case 'draft':
      return '#627070'
    default:
      return '#627070'
  }
}

const path = ['my-account']

export const isMyAccount = (pathname: string) => path.includes(pathname.split('/', 2).join(''))
// export const isDefinitePath = (pathname: string) => path.includes(pathname.split('/', 2).join(''))
export const formatDate = () => {
  const date = new Date()
  return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

export const formatTimestamp = (timestamp: any) => {
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }

  return formatDate()
}

export const uniqueList = (list: [], key: string) => [...new Set(list.flat().map((data) => data[key]))]

export const uniqueListCategories = (list: [], key: string) => {
  const categoryList = list.map(({ categories }) => categories)
  return [...new Map(categoryList.flat().map((item) => [item[key], item])).values()]
}

export const wordForm = (num: number, word: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return word[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]]
}

export const getArrRange = (array: [], range: number, part: number) => {
  var start = range * (part - 1)
  var end = range * part
  return array.slice(start, end)
}

export const ucFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const myPostList = [
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Выучи VUE и React',
    slug: 'Learn-VUE-and-React',
    categories: [
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Sports', slug: 'sports' },
    ],
    previewImage: {
      url: Apple,
      fileLocated: '',
    },
    timestamp: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: '1',
    uid: '',
    status: {
      type: 'published',
      message: '',
    },
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
    previewImage: {
      url: Code,
      fileLocated: '',
    },
    timestamp: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: '4',
    uid: '',
    status: {
      type: 'pending',
      message: '',
    },
  },
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Молодец, не останавливайся!',
    slug: 'Well-done-dont-stop',
    categories: [{ name: 'Web Development', slug: 'web-development' }],
    previewImage: {
      url: Css,
      fileLocated: '',
    },
    timestamp: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: '2',
    uid: '',
    status: {
      type: 'rejected',
      message: '',
    },
  },
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Ты получишь свою работу!',
    slug: 'Youll-get-your-job',
    categories: [{ name: 'Astronomy', slug: 'astronomy' }],
    previewImage: {
      url: Smile,
      fileLocated: '',
    },
    timestamp: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: '3',
    uid: '',
    status: {
      type: 'rejected',
      message: '',
    },
  },
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Css!',
    slug: 'Css',
    categories: [{ name: 'Web Development', slug: 'web-development' }],
    previewImage: {
      url: Image,
      fileLocated: '',
    },
    timestamp: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: '5',
    uid: '',
    status: {
      type: 'published',
      message: '',
    },
  },
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Js!',
    slug: 'Js',
    categories: [{ name: 'Education', slug: 'education' }],
    previewImage: {
      url: Js,
      fileLocated: '',
    },
    timestamp: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: '6',
    uid: '',
    status: {
      type: 'pending',
      message: '',
    },
  },
]
