import { AppRouter } from '../components/AppRouter/AppRouter'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { ArticleCardLarge } from '../components/ArticleCardLarge/ArticleCardLarge'
import { isMyAccount } from '../utils/index'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/Header/Header'
import { useSelector } from '../hooks/useTypedSelector'

export const Layout = () => {
  const posts = useSelector((state) => state.post.posts.filter((p) => p.status.type === 'published'))
  const idxLastPost = posts.length - 1
  const pathname = useLocation().pathname
  const styleMain = isMyAccount(pathname) ? 'w-full flex-grow ' : 'pb-20 px-6 w-full mt-10 flex-grow'
  const styleContainer = isMyAccount(pathname) ? 'flex-1 gap-5' : 'container mx-auto flex-1 flex flex-wrap gap-5'

  return (
    <div className='min-h-screen flex flex-col  bg-white dark:bg-purple-500 transition-all'>
      <Header />
      <main className={styleMain}>
        <div className={styleContainer}>
          {posts.length && pathname === '/' && (
            <div className='w-full'>
              <ArticleCardLarge post={posts[idxLastPost]} />
            </div>
          )}

          <div className='flex-1'>
            <AppRouter />
          </div>
          {pathname === '/' && <Sidebar />}
        </div>
      </main>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  )
}
// currentGray
