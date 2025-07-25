import { getPostBySlug, getAllPosts } from "@/lib/blog/utils"
import { Header } from '@/components/layout';
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  // Type assertion for the post data since it comes from frontmatter
  const typedPost = post as any
  
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{typedPost.title}</h1>
          
          <div className="flex items-center space-x-4 text-gray-600">
            {typedPost.date && (
              <span>{new Date(typedPost.date).toLocaleDateString()}</span>
            )}
            {typedPost.author && (
              <span>By {typedPost.author}</span>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={typedPost.content} />
        </div>
      </article>
        </div>
      </main>
    </>
  )
}