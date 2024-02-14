import {React, useState} from 'react'

const contact = () => {
  const [credentials, setcredentials] = useState({"name":"","email":"","phone":"","text":""});

  const HandleChange=(e)=>{
    e.preventDefault();
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const data = {
      "name":credentials.name,
      "email":credentials.email,
      "phone":credentials.phone,
      "text":credentials.text,
    }
    const response = await fetch("http://localhost:3000/api/createContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setcredentials({"name":"","email":"","phone":"","text":""});
    const res =  response.json();
    console.log(res);
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={HandleChange}/>
          </div>
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={HandleChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="phone" className="form-label">Phone</label>
          <input type="number" className="form-control" id="phone" name='phone' value={credentials.phone} onChange={HandleChange}/>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">tell me About yourself</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='text' value={credentials.text} onChange={HandleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default contact
