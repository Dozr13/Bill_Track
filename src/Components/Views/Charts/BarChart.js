import React, { useContext, useEffect, useState } from "react";
import { Bar, defaults } from "react-chartjs-2";
import { AuthContext } from "../../../Context/AuthContext";
import { ExpenseContext } from "../../../Context/ExpenseContext";

defaults.global.legend.position = "bottom";

const BarChart = () => {
  const userAuth = useContext(AuthContext);
  const userExpense = useContext(ExpenseContext);

  const [home, setHome] = useState(1250);
  const [insurance, setInsurance] = useState(1000);
  const [auto, setAuto] = useState(400);
  const [food, setFood] = useState(300);
  const [miscellaneous, setMiscellaneous] = useState(500);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses(setCatagories());
  }, [userExpense]);

  const setCatagories = () => {
    let home = 0;
    let insurance = 0;
    let auto = 0;
    let food = 0;
    let misc = 0;
    const homeTypes = ["Mortgage", "Electricity", "Water", "Garbage"];
    const insuranceTypes = [
      "Health Insurance",
      "Auto Insurance",
      "Medical Expenses",
    ];
    const autoTypes = ["Gas", "Auto Insurance", "Automotive Payment"];
    const foodTypes = ["Groceries", "Eating out"];
    const miscTypes = ["Cell Phone", "Internet", "Miscellaneous"];
    for (let i = 0; i < userExpense.expenses.length; i++) {
      if (homeTypes.includes(userExpense.expenses[i].bill_type)) {
        home += +userExpense.expenses[i].amount;
      }
      if (insuranceTypes.includes(userExpense.expenses[i].bill_type)) {
        insurance += +userExpense.expenses[i].amount;
      }
      if (autoTypes.includes(userExpense.expenses[i].bill_type)) {
        auto += +userExpense.expenses[i].amount;
      }
      if (foodTypes.includes(userExpense.expenses[i].bill_type)) {
        food += +userExpense.expenses[i].amount;
      }
      if (miscTypes.includes(userExpense.expenses[i].bill_type)) {
        misc += +userExpense.expenses[i].amount;
      }
    }
    return [home, insurance, auto, food, misc];
  };

  return (
    <div>
      <Bar
        data={{
          labels: ["Home", "Insurance", "Auto", "Food", "Miscellaneous"],
          datasets: [
            {
              label: "Spending",
              data: expenses,
              backgroundColor: [
                "#AF1B3F",
                "#E28413",
                "#CEE7E6",
                "#7CDF64",
                "#5F5AA2",
              ],
              borderColor: "#000",
              borderWidth: 1,
            },
          ],
        }}
        height={650}
        width={650}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  display: false,
                  beginAtZero: true,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 18,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
