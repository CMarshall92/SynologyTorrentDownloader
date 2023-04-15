import { useFormik } from 'formik';
import { useState } from 'react';
import AppBar from 'renderer/components/Appbar';
import Button from 'renderer/components/Button';
import Table, { Data } from 'renderer/components/Table';
import TextField from 'renderer/components/TextField';
import axiosInstance from 'renderer/lib/networking';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState<Data[]>([]);
  const token = localStorage.getItem('key');

  const formik = useFormik({
    initialValues: {
      torrent: '',
    },
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);
        const response = await axiosInstance({
          baseURL: 'http://localhost:4000',
          jwt: token,
        }).post('/add-torrent', {
          torrents: values.torrent,
        });

        if (response.status === 200) {
          setIsLoading(false);
          setListData((state) => [
            ...state,
            {
              id: state.length + 1,
              link: values.torrent
                .split('&')[1]
                .split('=')[1]
                .replace('+', ' ')
                .replace('.', ' '),
            },
          ]);
          actions.resetForm();
        }
      } catch {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <AppBar brand="Synology Torrent Downloader" />
      <form style={{ marginBottom: '2rem' }} onSubmit={formik.handleSubmit}>
        <TextField
          id="torrent"
          name="torrent"
          label="Torrent Magnet Link"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.torrent}
          variant="outlined"
        />
        <Button loading={isLoading} variant="contained" type="submit">
          Add torrent to DownloadStation
        </Button>
      </form>
      <Table data={listData} />
    </>
  );
}

export default App;
