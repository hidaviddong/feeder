import { atom } from 'jotai'

import { ALL_BLOGS } from '@/lib/utils'

export const counterAtom = atom(0)
export const currentBlogAtom = atom(ALL_BLOGS)
export const currentBlogListsAtom = atom([])
