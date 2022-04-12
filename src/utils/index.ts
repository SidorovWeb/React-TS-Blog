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
