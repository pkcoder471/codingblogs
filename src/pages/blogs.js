
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from '../styles/blogs.module.css'

const blogs = () => {

  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () =>{
      const response = await fetch('http://localhost:3000/api/blogs', {
        method: "GET", 
      });
      const data = await response.json();
      setblogs(data);
    }
    getAllBlogs();
  }, [])
  
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

export default blogs
