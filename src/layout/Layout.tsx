import { AppRouter } from '../components/AppRouter/AppRouter'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/Header/Header'

export const Layout = () => {
  return (
    <div className='min-h-screen  flex flex-col bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white text-sm md:text-base transition-all'>
      <Header />
      <main className='pb-6 md:pb-10 px-6 w-full mt-0 flex-grow' style={{ marginTop: `calc(var(--headerheight))` }}>
        <AppRouter />
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
