
import Link from 'next/link';
import React, { useState } from 'react'
import styles from '../styles/blogs.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';

const blogs = ({ newBlogs, allCount }) => {

  const [blogs, setblogs] = useState(newBlogs);
  const [count, setcount] = useState(5)

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/api/blogs?count=${count+5}`, {
    method: "GET",
    });
    setcount(count+2);
    const newBlogs = await response.json();
    setblogs(newBlogs);
  }

  return (

    <div className={styles.container}>
      <InfiniteScroll
        dataLength={blogs.length} //This is important field to render the next data
        next={fetchData}
        hasMore={allCount!==blogs.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {blogs.map((d) => {
          return (
            <div key={d.title} className={styles.blog}>
              <Link href={`/blogPost/${d.slug}`}><h2 className={styles.title}>{d.title}</h2></Link>
              <p className={styles.content}>{d.content.substr(0, 160)}...</p>
            </div>
          )
        })
        }
      </InfiniteScroll>

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
  const response = await fetch(`http://localhost:3000/api/blogs`, {
    method: "GET",
  });
  const res = await fetch(`http://localhost:3000/api/blogs?count=${5}`, {
    method: "GET",
  });
  const allBlogs = await response.json();
  const newBlogs = await res.json();
  const allCount = allBlogs.length;
  return {
    props: { newBlogs, allCount },
  };
}

export default blogs
