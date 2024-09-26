import BlogHeader from '@/components/blog-header'
import BlogMain from '@/components/blog-main'
export default function App() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <BlogHeader />
      <BlogMain />
    </div>
  )
}
