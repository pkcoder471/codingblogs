
import Link from 'next/link';
import React, { useState } from 'react'
import styles from '../styles/blogs.module.css'

const blogs = ({allBlogs}) => {

  const [blogs, setblogs] = useState(allBlogs);
  
  return (
    <div className={styles.container}>
      {blogs.map((d)=>{
        return (
          <div key={d.title} className={styles.blog}>
          <Link href={`/blogPost/${d.slug}`}><h2 className={styles.title}>{d.title}</h2></Link>
          <p className={styles.content}>{d.content.substr(0,160)}...</p>
          </div>
        )
      })
      }
    </div>
  )
  
}

// export async function getStaticProps() {
//   const allBlogs = [];

//   const blogs = await fs.promises.readdir('public/Blogdata');
        
//   for (let i = 0; i < blogs.length; i++) {
//       let file = blogs[i];
//       const newFile = await fs.promises.readFile(`public/Blogdata/${file}`, 'utf-8')
//       const File = await JSON.parse(newFile);
//       allBlogs.push(File);
//   }
//   return {
//     props: {
//       allBlogs
//     },
//   };
// }
export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:3000/api/blogs', {
        method: "GET", 
      });
  const allBlogs = await response.json();
  return {
    props: {allBlogs},
  };
}

export default blogs
