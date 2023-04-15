import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

interface Props {
  brand: string;
}
export default function AppBar({ brand }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('key');
    navigate('/');
  };

  return (
    <MuiAppBar>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          {brand}
        </Typography>
        <Button onClick={handleLogout} variant="contained" type="submit">
          Logout
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
