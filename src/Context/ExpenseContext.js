import { createContext, useState } from "react";
import { format, parseISO, addDays } from "date-fns";
import axios from "axios";

export const ExpenseContext = createContext(null);

export const ExpenseProvider = (props) => {
  const [expenses, setExpense] = useState([]);

  const [range, setRange] = useState([
    {
      startDate: format(new Date(), "yyyy-MM-dd", {
        awareOfUnicodeTokens: true,
      }),
      endDate: format(
        new Date(),
        "yyyy-MM-dd",
        { awareOfUnicodeTokens: true },
        addDays(new Date(), 30)
      ),
      key: "selection",
    },
  ]);

  const readRangeExpenses = (selection) => {
    setRange(selection);
    axios
      .post("/api/expenses-range", { ...selection })
      .then((res) => {
        setExpense(res.data);
      })
      .catch((err) => console.log(err));
  };

  const createExpense = (
    dueDate,
    expenseTitle,
    amount,
    billType,
    selection
  ) => {
    axios
      .post("/api/new-expense", { dueDate, expenseTitle, amount, billType })
      .then(({ data }) => {
        axios
          .post("/api/expenses-range", { ...selection })
          .then(() => {
            readRangeExpenses(...selection);
          })
          .catch((err) =>
            console.log("createExpenseTest inner .catch", err, data)
          );
        readRangeExpenses(range);
      })
      .catch((err) => console.log(dueDate));
  };

  const editExpense = (dueDate, expenseTitle, billType, amount, id) => {
    axios
      .put(`/api/edit-expense/${id}`, {
        dueDate,
        expenseTitle,
        billType,
        amount,
      })
      .then(() => {
        readRangeExpenses(range);
      })
      .catch((err) => console.log(err));
  };

  const deleteExpense = (id) => {
    axios
      .delete(`/api/expense/${id}`)
      .then((data) => {
        readRangeExpenses(range);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        range,
        setRange,
        setExpense,
        createExpense,
        editExpense,
        deleteExpense,
        readRangeExpenses,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};
