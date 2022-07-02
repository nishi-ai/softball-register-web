import React from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  Paper,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClipboardCopy from '../components/ClipboardCopy';

const apiUrl = process.env.REACT_APP_SERVER_URL;

const headCells = [
  {
    id: 'id',
    numeric: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    label: 'name',
  },
  {
    id: 'email',
    numeric: false,
    label: 'email',
  },
];

function PlayerList(props) {
  const players = props.playersList;
  const selectedPlayers = players.filter((player) => player.selected === true);
  const IsSelected = selectedPlayers.length > 0;
  const emailsArray = players.flatMap((e) => (e.selected ? [e.email] : []));

  // select all
  const onSelectAll = (e) => {
    props.setPlayerSelectedAll(e.target.checked);
  };
  // select items
  const onItemCheck = (e, index) => {
    props.setPlayerSelected(index, e.target.checked);
  };
  const deleteSelectedPlayers = async () => {
    // extract only emails from selected items, use flatmap
    // const emailsArray = players.flatMap((e) => (e.selected ? [e.email] : []));
    const adminPassword = props.password;

    try {
      const fetchResult = await fetch(`${apiUrl}/admin/players/`, {
        method: 'DELETE',
        body: JSON.stringify(emailsArray),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${adminPassword}`,
        },
      });
      if (fetchResult.status === 200) {
        props.getPlayersDataHandler(adminPassword);
      } else {
        alert('It could not be deleted.');
      }
    } catch (error) {
      window.location = '/500';
      console.log('error here:', error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} style={{ backgroundColor: 'black' }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(IsSelected && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {IsSelected ? <ClipboardCopy emails={emailsArray} /> : null}
          {IsSelected ? (
            <Tooltip title='Delete'>
              <IconButton onClick={() => deleteSelectedPlayers()}>
                <DeleteIcon sx={{ color: '#FFC15A' }} />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: '100%' }} aria-labelledby='tableTitle'>
            <div className='col-md-12'>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      onChange={(e) => onSelectAll(e)}
                      inputProps={{
                        'aria-label': 'select all',
                      }}
                    />
                  </TableCell>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      style={{ color: 'white' }}
                    >
                      <TableSortLabel>{headCell.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => {
                  return (
                    <TableRow
                      hover
                      // onChange={(event) => onItemCheck(event, index)}
                      role='checkbox'
                      aria-checked={player.selected}
                      tabIndex={-1}
                      key={player.id}
                      selected={player.selected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          onChange={(event) => onItemCheck(event, index)}
                          checked={player.selected}
                          inputProps={{
                            'aria-labelledby': player.id,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={player.id}
                        scope='row'
                        padding='none'
                        style={{ color: 'white' }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align='left' style={{ color: 'white' }}>
                        {player.name}
                      </TableCell>
                      <TableCell align='left' style={{ color: 'white' }}>
                        {player.email}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </div>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default PlayerList;
