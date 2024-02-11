const fs = require('fs')

export default async function handler(req, res) {

    const allBlogs = [];

    try {

        const blogs = await fs.promises.readdir('public/Blogdata');
        
        for (let i = 0; i < blogs.length; i++) {
            let file = blogs[i];
            const newFile = await fs.promises.readFile(`public/Blogdata/${file}`, 'utf-8')
            const File = await JSON.parse(newFile);
            allBlogs.push(File);
        }

        res.status(200).json(allBlogs);
    } catch (err) {

    }






}
