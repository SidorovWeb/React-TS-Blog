import { AppRouter } from '../components/AppRouter/AppRouter'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { ArticleCardLarge } from '../components/ArticleCardLarge/ArticleCardLarge'
import { isDefinitePath, myPostList } from '../utils/index'
import { IPostListProps } from '../types/posts'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/Header/Header'

export const Layout = () => {
  const [postList] = useState<IPostListProps[]>([...myPostList])
  const idxLastPost = postList.length - 1
  const pathname = useLocation().pathname
  const styleMain = isDefinitePath(pathname) ? 'w-full flex-grow' : 'pb-20 px-6 w-full mt-10 flex-grow'
  const styleContainer = isDefinitePath(pathname) ? 'flex-1 gap-5' : 'container mx-auto flex-1 flex flex-wrap gap-5'

  return (
    <div className='min-h-screen flex flex-col currentGray'>
      <Header />
      <main className={styleMain}>
        <div className={styleContainer}>
          {pathname === '/' && (
            <div className='w-full'>
              <ArticleCardLarge post={postList[idxLastPost]} />
            </div>
          )}

          <div className='flex-1'>
            <AppRouter />
          </div>
          {pathname === '/' && <Sidebar />}
        </div>
      </main>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}
