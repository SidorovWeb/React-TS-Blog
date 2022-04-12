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
    <div className='my-select w-full sm:w-auto'>
      <select
        value={value}
        className='relative bg-black bg-opacity-50 rounded-lg p-3 text-white font-bold w-full sm:w-48'
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
