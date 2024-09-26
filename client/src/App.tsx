import BlogHeader from '@/components/blog-header';
import BlogMain from '@/components/blog-main'
export default function App() {
  return (
    <div className="h-screen flex flex-col p-6">
      <BlogHeader/>
      <BlogMain/>
    </div>
  )
}

