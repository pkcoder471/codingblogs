import React, { useEffect, useState } from 'react'
import styles from '../../styles/blogpost.module.css'
const fs = require('fs');

const blog = ({File}) => {
    const [blog, setblog] = useState(File)

    return (
        <div className={styles.container}>
            <div className={styles.blogwrapper}>
                <h2 className={styles.title}>{blog.title}</h2>
                <div><span>Author -</span> <span className={styles.author}>"{blog.author}"</span></div>
                <p className={styles.content}>{blog.content}</p>
            </div>
        </div>
    )
}

export const getStaticPaths = (async () => {
    return {
      paths: [
        {params: {slug: 'How-to-learn-javascript',},}, 
        {params: {slug: 'How-to-learn-nextJs',},}, 
        {params: {slug: 'How-to-learn-reactJs',},}, 
      ],
      fallback: true, 
    }
})

export async function getStaticProps(context) {

    const {slug} = context.params;

    const newFile = await fs.promises.readFile(`public/Blogdata/${slug}.json`,'utf-8')
    const File = await JSON.parse(newFile);
    return {
      props: {
        File,
      },
    };
}
// export async function getServerSideProps(context) {
//     const {slug} = context.query;
//     const response = await fetch(`http://localhost:3000/api/getBlog?slug=${slug}`, {
//             method: "GET",
//         });
//     const data = await response.json();
//     return {
//       props: {data},
//     };
//   }

export default blog
