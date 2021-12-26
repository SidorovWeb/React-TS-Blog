import { NavBar } from '../components/Navbar/NavBar'
import { AppRouter } from '../components/AppRouter/AppRouter'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { ArticleCardLarge } from '../components/ArticleCardLarge/ArticleCardLarge'
import { myPostList } from '../utils/index'
import { IPostListProps } from '../types/types'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Layout = () => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])
  const idxLastPost = postList.length - 1
  const pathname = useLocation().pathname

  return (
    <div className='px-6 pb-20 min-h-screen' style={{ background: `#2d2d2d` }}>
      <header className='w-full'>
        <div className='container mx-auto'>
          <NavBar />
        </div>
      </header>
      <main className='w-full mt-10'>
        <div className='container mx-auto flex-1 flex flex-wrap gap-5'>
          {pathname === '/' && (
            <div className='w-full'>
              <ArticleCardLarge post={postList[idxLastPost]} />
            </div>
          )}

          <div className='flex-1'>
            <AppRouter />
          </div>
          {pathname !== '/login' && <Sidebar />}
        </div>
      </main>
    </div>
  )
}
