import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../../../Context/ExpenseContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Row from "./Row";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 500,
  },
});

function TableView(props) {
  const userExpense = useContext(ExpenseContext);
  const [tableMap, setTableMap] = useState([]);
  const [tableReduce, setTableReduce] = useState([]);

  userExpense.expenses = Array.from(userExpense.expenses);

  useEffect(
    (props) => {
      setTableMap(
        userExpense.expenses.map((e, i) => {
          return (
            <Row
              key={i}
              date={e.due_date}
              title={e.expense_title}
              type={e.bill_type}
              amount={e.amount}
              id={e.id}
            />
          );
        })
      );
      setTableReduce(
        userExpense.expenses.reduce((total, current) => {
          return (total += parseInt(current.amount));
        }, 0)
      );
    },
    [userExpense]
  );

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={useStyles().table}
          aria-label='sticky table'
          align='center'
        >
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                Date Due
              </TableCell>
              <TableCell
                align='center'
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                Title
              </TableCell>
              <TableCell
                className='computer'
                align='center'
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                Bill Type
              </TableCell>
              <TableCell
                align='center'
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                Amount
              </TableCell>
              <TableCell
                align='center'
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableMap.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            <TableRow>
              <TableCell
                colSpan={3}
                align='right'
                style={{ fontSize: 28, fontWeight: 700 }}
              >
                Total:
              </TableCell>
              <TableCell align='center' style={{ fontSize: 28 }}>
                {tableReduce}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 8]}
          component='div'
          count={userExpense.expenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}

export default TableView;
