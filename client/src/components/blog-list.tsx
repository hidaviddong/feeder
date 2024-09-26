import { useQuery, gql } from '@apollo/client';
import {LoaderIcon} from 'lucide-react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';

const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    blogs {
      id
      title
      link
      author
      date
      description
      source
    }
  }
`;

interface Blog {
    id: string;
    title: string;
    author: string;
    source: string;
    description: string;
    date: string;
    link: string;
  }
  
  interface GET_ALL_BLOGS_TYPE {
    blogs: Blog[];
  }


export default function BlogList() {
  const { loading: allBlogsLoading, error: allBlogsError, data: allBlogsData } = useQuery<GET_ALL_BLOGS_TYPE>(GET_ALL_BLOGS);
  if (allBlogsLoading) return <Button variant='ghost' className='w-24'><LoaderIcon className='ml-4 h-4 w-4'/></Button>;
  if (allBlogsError) return <p>Error: {allBlogsError.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {allBlogsData?.blogs.map((blog) => (
        <Card key={blog.id}>
          
          <CardHeader>
            <div className='w-full flex justify-between text-sm text-[#666666]'>
                <p>{blog.source}</p>
                <p >{blog.date}</p>
            </div>
            <a href={blog.link} target="_blank" rel="noopener noreferrer">
            <CardTitle className='text-lg'>
                {blog.title}
            </CardTitle>
            </a>
            <CardDescription className='text-sm text-[#666666]'>  
            {blog.description.length>0 && <p>{blog.description.substring(0, 100)}</p>}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
