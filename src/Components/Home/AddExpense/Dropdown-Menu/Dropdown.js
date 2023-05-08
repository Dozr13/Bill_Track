import React, {useState, useEffect} from 'react'
import Creatable, {makeCreatableSelect} from 'react-select/creatable'
import './Dropdown.scss'


const Dropdown = (props) => {

  const [selectedOption, setSelectedOption] = useState({label: '', value: ''})

  const [options] = useState([
    {
      label: 'Mortgage',
      value: 'Mortgage'
    },
    {
      label: 'Gas',
      value: 'Gas'
    },
    {
      label: 'Health Insurance',
      value: 'Health Insurance'
    },
    {
      label: 'Auto Insurance',
      value: 'Auto Insurance'
    },
    {
      label: 'Medical Expenses',
      value: 'Medical Expenses'
    },
    {
      label: 'Electricity',
      value: 'Electricity'
    },
    {
      label: 'Water',
      value: 'Water'
    },
    {
      label: 'Cell Phone',
      value: 'Cell Phone'
    },
    {
      label: 'Garbage',
      value: 'Garbage'
    },
    {
      label: 'Automotive Payment',
      value: 'Automotive Payment'
    },
    {
      label: 'Internet',
      value: 'Internet'
    },
    {
      label: 'Groceries',
      value: 'Groceries'
    },
    {
      label: 'Eating Out',
      value: 'Eating out'
    },
    {
      label: 'Miscellaneous',
      value: 'Miscellaneous'
    }
  ]);

  useEffect(() => {
    props.getValue(selectedOption.value)
  }, [selectedOption.value])

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }

  return(
    <div className='selector'>
      <Creatable
        className='dropbox'
        placeholder='Expense Type'
        options={options}
        menuPlacement='bottom'
        maxMenuHeight={200}
        onChange={handleChange} />
    </div>
  )
}


export default Dropdown
