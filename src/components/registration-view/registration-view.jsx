import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./registration-view.scss";


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthDate, setBirthDate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthDate);
    props.onRegistring(
      username && password && email && birthDate
    );
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Date of Birth:
        <input type="text" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

RegistrationView.propTypes = {
username: PropTypes.string,
password: PropTypes.string,
email: PropTypes.string,
birthDate: PropTypes.string
}