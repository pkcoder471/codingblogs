import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/blogpost.module.css'
const blog = () => {
    
    const router = useRouter();
    const slug = router.query.slug;
    const [blog, setblog] = useState({})

    useEffect(() => {
        const getBlog = async () => {
        const response = await fetch(`http://localhost:3000/api/getBlog?slug=${slug}`, {
            method: "GET",
        });
        const data = await response.json();
        setblog(data);
        }
        getBlog();
    }, [slug])

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

export default blog
