import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useQuery, gql } from '@apollo/client';


type Blog = {
  author: string;
  date: string;
  description: string;
  id: string;
  link: string;
  title: string;
};

type Blogs = Blog[];

const GET_BLOGS_BY_SOURCE = gql`
      query {
        blogsBySource {
          source
          blogs {
            id
            title
            link
            author
            date
            description
          }
        }
      }
`;



export default function Home() {
  const { loading, error, data:blogs } = useQuery(GET_BLOGS_BY_SOURCE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const data = blogs.blogsBySource;
  return (
    <Tabs defaultValue={data[0]?.source} className="w-[800px]">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((source) => (
          <TabsTrigger key={source.source} value={source.source}>
            {source.source}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((source) => (
        <TabsContent key={source.source} value={source.source}>
          <Card>
            <CardHeader>
              <CardTitle>{source.source} Blogs</CardTitle>
              <CardDescription>
                Latest blog posts from {source.source}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 h-[400px] overflow-y-auto">
                {source.blogs.map((blog) => (
                  <li key={blog.id} className="p-4 rounded-md border">
                    <a href={blog.link} className="text-lg font-semibold hover:underline">{blog.title}</a>
                    <p className="text-sm text-gray-600 mt-1">{blog.description}</p>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>{blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
