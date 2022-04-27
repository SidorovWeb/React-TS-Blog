import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import useDarkMode from '../../../hooks/useDarkMode'

export const ThemeSwitcher: FC = () => {
  const [colorTheme, setTheme] = useDarkMode()

  return (
    <>
      {colorTheme === 'light' ? (
        <div className='p-1'>
          <SunIcon
            className='iconSun cursor-pointer hover:opacity-60 transition-opacity '
            width={24}
            onClick={() => setTheme(colorTheme)}
          />
        </div>
      ) : (
        <div className='p-1'>
          <MoonIcon
            className='iconMoon cursor-pointer hover:opacity-60 transition-opacity '
            width={24}
            onClick={() => setTheme(colorTheme)}
          />
        </div>
      )}
    </>
  )
}
