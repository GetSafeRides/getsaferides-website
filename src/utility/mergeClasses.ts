import { twMerge } from 'tailwind-merge'

type ClassValue = string | undefined | null | false

export function mergeClasses(...classNames: ClassValue[]) {
  return twMerge(classNames.filter(Boolean).join(' '))
}
