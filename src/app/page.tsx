'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';


interface Row {
  name: string;
  surname: string;
  age: number;
  dni: string;
  mail: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {

  function createData(
    name: string,
    surname: string,
    age: number,
    dni: number,
    mail: string,
  ) {
    return { name, surname, age, dni, mail};
  }

const [rows, setRows] = useState([])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbz_nuszBDIw2AIUCr2KjtfvbxXs8cdJGQbuJIB5tTdp6GV2T4Og7Pd6SIb12VVYBnlb/exec',
          {
            method: 'GET',
            headers: {
              'Content-Type': "text/plain;charse=utf=8",
            },
          }
        );

        const data = await response.json();
        const values = data.data || [];
        const tableValues = values.map((row: any) =>{
          return(
            createData(...row as [string, string, number, number, string])
          )
        })
        setRows(tableValues);
      } catch (error) {
        console.error('Error al obtener los datos de la hoja de cálculo:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="center">Surname</StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Dni</StyledTableCell>
            <StyledTableCell align="center">Mail</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.surname}</StyledTableCell>
              <StyledTableCell align="center">{row.age}</StyledTableCell>
              <StyledTableCell align="center">{row.dni}</StyledTableCell>
              <StyledTableCell align="center">{row.mail}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}