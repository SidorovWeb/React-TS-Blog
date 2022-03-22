import { FC } from 'react'

interface FieldsetProps {
  type: string
  id: string
  value: string
  labelText?: string
  onChange: (e: any) => void
  onBlur?: (e: any) => void
  children?: React.ReactNode
  clName?: string
}

export const Fieldset: FC<FieldsetProps> = ({
  children,
  type,
  id,
  value,
  labelText,
  clName = '',
  onChange,
  onBlur,
}) => {
  return (
    <fieldset className='mb-10'>
      {labelText && (
        <label className='mb-2 block' htmlFor={id}>
          {labelText}
        </label>
      )}

      <input
        className={`bg-gray-200 w-full text-xl py-2 px-4 rounded-lg border-2 transition-all ${clName}`}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {children}
    </fieldset>
  )
}
