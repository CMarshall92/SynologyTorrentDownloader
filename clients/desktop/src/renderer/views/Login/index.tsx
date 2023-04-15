import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TextField from 'renderer/components/TextField';
import Button from 'renderer/components/Button';
import axiosInstance from 'renderer/lib/networking';

import '../../styles/Login.css';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem('key');
    const timeout = localStorage.getItem('keyTimeout');

    if (key && timeout) {
      const now = new Date();
      const dateToCheck = new Date(timeout);

      if (dateToCheck < now) {
        navigate('/app');
      }
    }
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axiosInstance().post('/login', {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          setIsLoading(false);
          localStorage.setItem('key', response.data.token);
          localStorage.setItem('keyTimeout', new Date().toISOString());
          navigate('/app');
        }
      } catch {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="branding">
        <h1 style={{ textAlign: 'center' }}>Synology Torrent Downloader</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          variant="outlined"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          variant="outlined"
        />
        <Button loading={isLoading} variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
