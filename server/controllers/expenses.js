module.exports = {
  createExpense: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { id } = req.session.user;
      const { dueDate, expenseTitle, amount, billType } = req.body;
      const [checkDate] = await db.expenses_date.check_date(dueDate);
      if (checkDate) {
        const [expense] = await db.expenses.create_expense([
          expenseTitle,
          amount,
          billType,
          id,
        ]);
        await db.expense_junction.create_expense_junction(
          checkDate.id,
          expense.id
        );
        const expenses = await db.expenses.read_day_expenses(
          req.session.user.id,
          dueDate
        );
        res.status(200).send(expenses);
      } else {
        const [checkDate] = await db.expenses_date.create_date(dueDate);
        const [expense] = await db.expenses.create_expense([
          expenseTitle,
          amount,
          billType,
          id,
        ]);
        await db.expense_junction.create_expense_junction(
          checkDate.id,
          expense.id
        );
        const expenses = await db.expenses.read_day_expenses(
          req.session.user.id,
          dueDate
        );
        res.status(200).send(expenses);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  readDayExpense: async (req, res) => {
    const { id } = req.session.user;
    const { dueDate } = req.body;
    const db = req.app.get("db");
    if (dueDate) {
      if (dueDate.day <= 9) {
        dueDate.day = `0${dueDate.day}`;
      }
      if (dueDate.month <= 9) {
        dueDate.month = `0${dueDate.month}`;
      }
      const date = `${dueDate.year}-${dueDate.month}-${dueDate.day}`;
      db.expenses
        .read_day_expenses(id, date)
        .then((expenses) => {
          res.status(200).send(expenses);
        })
        .catch((err) => console.log(err));
    }
  },

  deleteExpense: (req, res) => {
    const db = req.app.get("db");
    db.expenses
      .delete_expense([+req.params.id, req.session.user.id])
      .then((_) => {
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },

  readRangeExpenses: async (req, res) => {
    const { id } = req.session.user;
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (startDate instanceof Date && endDate instanceof Date) {
      startDate = `${startDate.getFullYear()}-${
        startDate.getMonth() + 1 <= 9
          ? "0" + (startDate.getMonth() + 1)
          : startDate.getMonth() + 1
      }-${
        startDate.getDate() <= 9
          ? "0" + startDate.getDate()
          : startDate.getDate()
      }`;
      endDate = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1 <= 9
          ? "0" + (endDate.getMonth() + 1)
          : endDate.getMonth() + 1
      }-${
        endDate.getDate() <= 9 ? "0" + endDate.getDate() : endDate.getDate()
      }`;
    }
    const db = await req.app.get("db");
    if (startDate && endDate) {
      db.expenses
        .read_all_expenses_date(id, startDate, endDate)
        .then((expenses) => res.status(200).send(expenses))
        .catch((err) => console.log("1", err));
    } else if (startDate) {
      db.expenses
        .read_all_expenses_date(id, startDate, startDate)
        .then((expenses) => res.status(200).send(expenses))
        .catch((err) => console.log("2", err));
    }
  },

  editExpense: async (req, res) => {
    const { dueDate, expenseTitle, amount, billType } = req.body;
    const [bill] = await req.app
      .get("db")
      .expenses.read_expense([req.params.id]);
    let date = dueDate || bill.due_date;
    let title = expenseTitle || bill.expense_title;
    let price = amount || bill.amount;
    let type = billType || bill.bill_type;
    req.app
      .get("db")
      .expenses.edit_expense([
        date,
        bill.expenses_date_id,
        title,
        price,
        type,
        req.params.id,
        req.session.user.id,
      ])
      .then((expense) =>
        expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({})
      )
      .catch((err) => console.log(err));
  },
};
