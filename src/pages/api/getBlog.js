const fs = require('fs')

export default async function handler(req, res) {

    const slug = req.query.slug;

    try {
        const newFile = await fs.promises.readFile(`public/Blogdata/${slug}.json`,'utf-8')
        const File = await JSON.parse(newFile);

        res.status(200).json(File);

    } catch (err) {
        return res.status(500).json({"error":"Internal Server Error Occured"});
    }
    

    
  }
  