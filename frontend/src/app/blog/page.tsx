import { getAllPosts } from "@/lib/blog/utils"
import { Header } from '@/components/layout';
import { HeroSection } from '@/components/sections';
import Link from "next/link"

export default async function BlogPage() {
  const posts = await getAllPosts()
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <HeroSection variant="blog" />
        <div className="container mx-auto px-4 py-16 bg-white rounded-t-3xl -mt-12 relative z-10 shadow-xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Latest Posts</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-700 text-lg">No blog posts yet.</p>
          <p className="text-gray-600 mt-2">Check back later for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-700 mb-4">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.date && (
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  )}
                  {post.author && (
                    <span>By {post.author}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
        </div>
      </main>
    </>
  )
}