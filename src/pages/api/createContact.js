const fs = require('fs')

export default async function handler(req, res) {

    try {
        const contacts = await fs.promises.readdir('public/ContactData');
        const len = contacts.length;
        const newFile = await fs.promises.writeFile(`public/ContactData/${len+1}.json`,JSON.stringify(req.body));

        res.status(200).json(newFile);

    } catch (err) {
        return res.status(500).json({"error":"Internal Server Error Occured"});
    }
    

    
  }
  