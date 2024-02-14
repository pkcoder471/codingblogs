import { React, useState } from 'react'
import styles from '../styles/contact.module.css';

const contact = () => {
  const [credentials, setcredentials] = useState({ "name": "", "email": "", "phone": "", "text": "" });

  const HandleChange = (e) => {
    e.preventDefault();
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "name": credentials.name,
      "email": credentials.email,
      "phone": credentials.phone,
      "text": credentials.text,
    }
    const response = await fetch("http://localhost:3000/api/createContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setcredentials({ "name": "", "email": "", "phone": "", "text": "" });
    alert("thank you for contacting us!!")

  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={HandleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={HandleChange} />
          <div id="emailHelp" className={styles.formText}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="phone" className="form-label">Phone</label>
          <input type="number" className="form-control" id="phone" name='phone' value={credentials.phone} onChange={HandleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" class={styles.formlabel}>Tell me About yourself</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name='text' value={credentials.text} onChange={HandleChange}></textarea>
        </div>
        <div className={styles.btn}>
          <button type="submit" className="btn">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default contact
