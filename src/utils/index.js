import Image from '../images/img.webp'
import Pushkin from '../images/pushkin.webp'

export const formatDate = () => {
  const date = new Date()
  return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

export const myPostList = [
  {
    author: 'Сидоров Александр',
    authorPhoto: Pushkin,
    title: 'Выучи VUE и React',
    slug: 'Learn-VUE-and-React',
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
    title: 'Ты получишь свою работу awdaw awdawd awdawd awdaw dawd wd !',
    slug: 'Youll-get-your-job',
    previewImage: Image,
    dateOfCreation: formatDate(),
    excerpt:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    content:
      'Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!Type errors will show up in the same console as the build one. You have to fix these type errors before you continue development or build your project. For advanced configuration!',
    id: 3,
  },
]
