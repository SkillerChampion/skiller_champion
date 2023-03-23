/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Scrollbar } from 'react-scrollbars-custom';
import classes from './Table.module.css';
import { ARRAY_KEYS, HEDERA_API_KEYS } from '../../../utils/constants';
import Spinner from '../Spinner/Spinner';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4f46e5',
    color: theme.palette.common.white,
    fontFamily: 'Montserrat',
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: theme.palette.common.white,
    fontWeight: 500
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#181f2e'
  },
  '&:nth-of-type(odd)': {
    backgroundColor: '#111827'
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const TableData = ({ headers = [], bodyData = [], isFetching = false }) => {
  if (isFetching) return <Spinner center />;

  return (
    <Scrollbar className={`${classes.removeInset} h-full w-full`}>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="customized table" className="">
          <TableHead>
            <TableRow>
              {headers?.map((item, index) => {
                const minWidth = item[ARRAY_KEYS.MIN_WIDTH];

                return (
                  <StyledTableCell
                    align="center"
                    key={index}
                    style={minWidth ? { minWidth: minWidth } : {}}>
                    {item[ARRAY_KEYS.HEADER]}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyData.map((row, index) => {
              const rowsArray = Object.keys(row);

              return (
                <StyledTableRow key={index}>
                  {rowsArray?.map((item, rowIndex) => {
                    if (item === ARRAY_KEYS.DISPLAY_FN) {
                      const displayFn = row[ARRAY_KEYS.DISPLAY_FN];

                      return (
                        <StyledTableCell align="center" key={rowIndex}>
                          {displayFn}
                        </StyledTableCell>
                      );
                    }

                    const dataText = row[headers?.[rowIndex]?.[ARRAY_KEYS.VALUE]];
                    return (
                      <StyledTableCell
                        align="center"
                        key={rowIndex}
                        className={`${
                          dataText === HEDERA_API_KEYS.FAILED && 'bg-red-700 text-white'
                        } ${
                          dataText === HEDERA_API_KEYS.SUCCESS &&
                          'bg-green-700 text-white font-bold'
                        }`}>
                        {dataText}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

export default TableData;
