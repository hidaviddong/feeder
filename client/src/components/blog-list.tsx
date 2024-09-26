import { gql, useQuery } from '@apollo/client'
import { useAtomValue } from 'jotai'
import { LoaderIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { currentBlogAtom } from '@/store'

const GET_BLOGS = gql`
  query GetBlogs($source: String!) {
    blogs(source: $source) {
      id
      author
      date
      description
      link
      source
      title
    }
  }
`

interface Blog {
  id: string
  title: string
  author: string
  source: string
  description: string
  date: string
  link: string
}

interface GET_BLOGS_TYPE {
  blogs: Blog[]
}

export default function BlogList() {
  const currentBlog = useAtomValue(currentBlogAtom)
  const { loading, error, data } = useQuery<GET_BLOGS_TYPE>(GET_BLOGS, {
    variables: { source: currentBlog }
  })
  if (loading)
    return (
      <Button variant="ghost" className="w-24">
        <LoaderIcon className="ml-4 h-4 w-4" />
      </Button>
    )
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:w-1/2">
      {data?.blogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>
            <div className="flex w-full justify-between text-sm text-[#666666]">
              <p>{blog.source}</p>
              <p>{blog.date}</p>
            </div>
            <a href={blog.link} target="_blank" rel="noopener noreferrer">
              <CardTitle className="text-lg">{blog.title}</CardTitle>
            </a>
            <CardDescription className="text-sm text-[#666666]">
              {blog.description.length > 0 && <p>{blog.description.substring(0, 100)}..</p>}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
