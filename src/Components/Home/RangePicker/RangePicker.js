import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { ExpenseContext } from "../../../Context/ExpenseContext";
import { DateRangePicker } from "react-date-range";
import { addDays, format, parseISO } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Home.scss";

const modalElement = document.getElementById("modal-root");

function RangePicker({ children, fade = false, defaultOpened = false }, ref) {
  const userExpense = useContext(ExpenseContext);

  const [isOpen, setIsOpen] = useState(defaultOpened);
  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      key: "selection",
    },
  ]);

  const dayHandler = (item) => {
    setRange([item.selection]);
    userExpense.setRange([item.selection]);
    userExpense.readRangeExpenses(item.selection);
  };

  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? "modal-fade" : ""}`}>
        <div className='modal-overlay' onClick={close} />
        <div className='background-container'></div>
        <div className='modal-body'>
          <h2 className='modal-font'>Select Date Range to view</h2>
          <DateRangePicker
            className='picker-style'
            onChange={dayHandler}
            dateDisplayFormat='yyyy-MM-dd'
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={range}
            direction='vertical'
            scroll={{ enabled: true }}
          />
        </div>
        <span
          role='button'
          className='modal-close'
          aria-label='close'
          onClick={close}
        >
          X
        </span>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(RangePicker);
