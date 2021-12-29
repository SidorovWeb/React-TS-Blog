import { FC } from 'react'

interface MySelect {
  options: {
    name: string
    slug: string
  }[]
  defaultValue: string
  value: string
  onChange: (val: string) => void
}

export const MySelect: FC<MySelect> = ({ options, defaultValue, value, onChange }) => {
  return (
    <div className='my-select'>
      <select
        value={value}
        className='relative bg-black bg-opacity-50 rounded-lg p-3 w-48 text-white font-bold'
        onChange={(e) => onChange(e.target.value)}
      >
        <option className='w-44 truncate overflow-hidden' value='all'>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option className='w-44 truncate overflow-hidden' value={option.name} key={option.slug}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
