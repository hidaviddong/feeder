import { gql, useQuery } from '@apollo/client'
import { useMediaQuery } from '@react-hookz/web'
import { useAtom } from 'jotai'
import { ChevronDown, ChevronUp, LoaderIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ALL_BLOGS } from '@/lib/utils'
import { currentBlogAtom } from '@/store'

import BlogList from './blog-list'

const GET_SOURCES = gql`
  query GetSources {
    sources
  }
`
interface GET_SOURCES_TYPE {
  sources: string[]
}

export default function BlogMain() {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  const [currentBlog, setCurrentBlog] = useAtom(currentBlogAtom)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { loading, error, data } = useQuery<GET_SOURCES_TYPE>(GET_SOURCES)
  if (loading)
    return (
      <Button variant="ghost" className="w-24">
        <LoaderIcon className="ml-4 h-4 w-4" />
      </Button>
    )
  if (error) return <p>Error : {error.message}</p>
  function handleSourceClick(source: string) {
    setIsDrawerOpen(false)
    setCurrentBlog(source)
  }
  return (
    <main className="flex w-full flex-col items-center justify-center">
      {isSmallDevice ? (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost">
              {currentBlog}
              {isDrawerOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <ul className="text-md space-y-4 p-4 text-slate-800">
              <li onClick={() => handleSourceClick(ALL_BLOGS)}>{ALL_BLOGS}</li>
              {data?.sources.map((source) => (
                <li key={source} onClick={() => handleSourceClick(source)}>
                  {source}
                </li>
              ))}
            </ul>
          </DrawerContent>
        </Drawer>
      ) : (
        <div className="my-2 flex w-full justify-center space-x-4 ">
          <Button
            variant={currentBlog === ALL_BLOGS ? 'default' : 'ghost'}
            onClick={() => handleSourceClick(ALL_BLOGS)}>
            {ALL_BLOGS}
          </Button>
          {data?.sources.map((source) => (
            <Button
              key={source}
              variant={currentBlog === source ? 'default' : 'ghost'}
              onClick={() => handleSourceClick(source)}>
              {source}
            </Button>
          ))}
        </div>
      )}
      <BlogList />
    </main>
  )
}
