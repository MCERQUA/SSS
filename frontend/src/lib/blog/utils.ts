import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }
  
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace(/\.mdx$/, ''),
        ...data,
        content,
      }
    })
  
  return posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    ...data,
    content,
  }
}