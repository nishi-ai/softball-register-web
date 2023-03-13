import React from "react";
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
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClipboardCopy from "./ClipboardCopy";
import { PlayersList } from "../../types";

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    label: "name",
  },
  {
    id: "email",
    numeric: false,
    label: "email",
  },
];

function PlayerList(props: {
  playersList: PlayersList[];
  password: string;
  getPlayersDataHandler: (password: string) => Promise<void>;
  setPlayerSelected: (index: number, value: boolean) => void;
  setPlayerSelectedAll: (value: boolean) => void;
}) {
  const players = props.playersList;
  const selectedPlayers = players.filter((player) => player.selected === true);
  const IsSelected = selectedPlayers.length > 0;
  const emailsArray = players.flatMap((e) => (e.selected ? [e.email] : []));

  // select all
  const onSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setPlayerSelectedAll(e.target.checked);
  };
  // select items
  const onItemCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    props.setPlayerSelected(index, e.target.checked);
  };
  const deleteSelectedPlayers = async () => {
    // extract only emails from selected items, use flatmap
    // const emailsArray = players.flatMap((e) => (e.selected ? [e.email] : []));
    const adminPassword = props.password;

    try {
      const fetchResult = await fetch("/api/delete-players", {
        method: "DELETE",
        body: JSON.stringify(emailsArray),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${adminPassword}`,
        },
      });
      if (fetchResult.status === 200) {
        props.getPlayersDataHandler(adminPassword);
      } else {
        alert("It could not be deleted.");
      }
    } catch (error) {
      window.location.href = "/500";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div
        data-sx={{ width: "100%", mb: 2 }}
        style={{ backgroundColor: "#1f2434" }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          {IsSelected ? <ClipboardCopy emails={emailsArray} /> : null}
          {IsSelected ? (
            <Tooltip title='Delete'>
              <IconButton onClick={() => deleteSelectedPlayers()}>
                <DeleteIcon sx={{ color: "#FFC15A" }} />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: "100%" }} aria-labelledby='tableTitle'>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    sx={{
                      color: "#ffc15a",
                      "&.Mui-checked": {
                        color: "#ffc15a",
                      },
                    }}
                    onChange={(e) => onSelectAll(e)}
                    inputProps={{
                      "aria-label": "select all",
                    }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    style={{ color: "white" }}
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
                    role='checkbox'
                    aria-checked={player.selected}
                    tabIndex={-1}
                    key={player.id}
                    selected={player.selected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        sx={{
                          color: "#ffc15a",
                          "&.Mui-checked": {
                            color: "#ffc15a",
                          },
                        }}
                        onChange={(event) => onItemCheck(event, index)}
                        checked={player.selected}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      data-id={player.id}
                      scope='row'
                      style={{ color: "white" }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align='left' style={{ color: "white" }}>
                      {player.name}
                    </TableCell>
                    <TableCell align='left' style={{ color: "white" }}>
                      {player.email}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
}

export default PlayerList;
