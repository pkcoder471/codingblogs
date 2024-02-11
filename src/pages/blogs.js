
import React, { useEffect, useState } from 'react'

const blogs = () => {

  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () =>{
      const response = await fetch('http://localhost:3000/api/blogs', {
        method: "GET", 
      });
      const data = await response.json();
      console.log(data);
      setblogs(data);
    }
    getAllBlogs();
  }, [])
  
  return (
    <div className="container">
      {blogs.map((d)=>{
        return (
          <div key={d.title} className='blog'>
          <h2 className="title">{d.title}</h2>
          <p className='content'>{d.content.substr(0,160)}</p>
          </div>
        )
      })
      }
    </div>
  )
}

export default blogs
