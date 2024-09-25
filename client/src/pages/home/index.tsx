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
  const { loading, error, data } = useQuery(GET_BLOGS_BY_SOURCE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return data.blogsBySource.map(({source,blogs}:{source:string,blogs:Blogs}) => {
        return (
          <>
        <h1 className='text-4xl text-red-500'>{source}</h1>
          <div className='h-48 overflow-scroll border rounded-md w-3/4 '>   
            <ul className='flex flex-col space-y-4'>
              {blogs.map(({id,title,link,author,date,description}) => {
                return (
                  <li key={id} className='rounded-md border-2'>
                    <a href={link}>{title}</a>
                    <p>{description}</p>
                    <p>{author}</p>
                    <p>{date}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          </>
        );
    })
}
