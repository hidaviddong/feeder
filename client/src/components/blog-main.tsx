
import { useQuery, gql } from '@apollo/client';
import { useMediaQuery } from '@react-hookz/web';
import {ChevronDown,ChevronUp,LoaderIcon} from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import BlogList from './blog-list';

const GET_SOURCES = gql`
  query GetSources {
    sources
  }
`;

interface GET_SOURCES_TYPE {
  sources: string[]
}


export default function BlogMain() {
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
    const [isDrawerOpen,setIsDrawerOpen] = useState(false)
    const { loading, error, data } = useQuery<GET_SOURCES_TYPE>(GET_SOURCES);
    if (loading) return <Button variant='ghost' className='w-24'><LoaderIcon className='ml-4 h-4 w-4'/></Button>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <main>
        {isSmallDevice ? (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
        <Button variant="ghost">
          All Posts { isDrawerOpen? <ChevronUp className="ml-2 h-4 w-4" />:<ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
        </DrawerTrigger>
        <DrawerContent>
          <ul className='text-md p-4 text-slate-800 space-y-4'>
              <li>All Posts</li>
            {
              data?.sources.map((source)=>(
                <li key={source}>{source}</li>
              ))
            }
          </ul>
        </DrawerContent>
        </Drawer>
        ):(
          <div className='w-full flex space-x-4'>
            <Button variant="ghost"> All Posts</Button>
            {
              data?.sources.map((source)=>(
                <Button key={source} variant="ghost">{source}</Button>
              ))
            }
          </div>
        )}
        <BlogList/>
        </main>
    )
  }
  