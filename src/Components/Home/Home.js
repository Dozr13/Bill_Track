import React, {useState, useEffect, useContext, useRef} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
import {AuthContext} from '../../Context/AuthContext'

import {format, addDays, parseISO} from 'date-fns';


import AddExpense from './AddExpense/AddExpense'
import Goals from './Goals/Goals'
import UserExpenses from './UserExpected/UserExpected'
import DoughnutChart from '../Views/Charts/DoughnutChart'
import BarChart from '../Views/Charts/BarChart'
import RangePicker from './RangePicker/RangePicker'
import TableView from './Table/TableView'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


import './Home.scss'


function Home() {
  const userExpense = useContext(ExpenseContext)
  const userAuth = useContext(AuthContext)

  const [selectedChart, setSelectedChart] = useState('Doughnut')

  const [display, setDisplay] = useState(true)


  const modal = useRef(null)
  const addModal = useRef(null)
  const goalModal = useRef(null)
  const userModal = useRef(null)

  useEffect(() => {
    userExpense.readRangeExpenses({
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      key: 'default'
    })
  }, [])


  const handleRemove = (id) => {
    userExpense.deleteExpense(id)
  }




return (

  <div id='home-view'>
      <header id='home-header' />

      <button className='phone' onClick={() => setDisplay(!display)}>Swap</button>


      <main>

        <div id='vertical-panes'>
          <div className={`left ${display && 'display'}`}>
          <div>
          {!userAuth.user &&
          null
          }
          {userAuth.user &&
          <div className='welcome-top computer'>
            <h3>
              Welcome to BillTrax <br/> {userAuth.user.firstName}!
            </h3>
          </div>
          }
        </div>
            {selectedChart === 'Doughnut' ? <DoughnutChart /> : <BarChart />}
        <br />

              <section id='view-selection-btns'>
                <button className='doughnut-btn' onClick={() => setSelectedChart('Doughnut')}>
                  View Doughnut
                </button>
                <button className='bar-chart-btn' onClick={() => setSelectedChart('Bar')}>
                  View Bar Graph
                </button>
              </section>
          </div>


          <div className={`right ${!display && 'display'}`}>

            <TableView
              handleRemove={handleRemove}
              />
            <div className='popup-list'>
              <div className='dates-link'>
                <a onClick={() => modal.current.open()}>
                  <DateRangeIcon style={{fontSize: 50}} />
                  <span>View Dates</span>
                </a>
                  <RangePicker ref={modal} />
              </div>

              <div className='expenses-link'>
                <a onClick={() => addModal.current.open()}>
                  <LibraryAddIcon style={{fontSize: 50}} />
                  <span>Add Expense</span>
                </a>
                  <AddExpense ref={addModal} />
              </div>

              <div className='goals-link'>
                <a onClick={() => goalModal.current.open()}>
                  <SentimentVerySatisfiedIcon style={{fontSize: 50}} />
                  <span>Add Goals</span>
                </a>
                    <Goals ref={goalModal} />
              </div>
              <div className='user-expense-link'>
                <a onClick={() => userModal.current.open()}>
                  <AttachMoneyIcon style={{fontSize: 50}} />
                  <span>Expected</span>
                </a>
                  <UserExpenses ref={userModal} />
              </div>
            </div>
            <br />
          </div>
        </div>
        {!userAuth.user &&
          null
          }
          {userAuth.user &&
          <div className='welcome-top phone'>
            <h3>
              Welcome to BillTrax <br/> {userAuth.user.firstName}!
            </h3>
          </div>
          }
      </main>


      <footer>
        <div className='footer-text'>
          <p>Copyright &copy; BillTrax 2021</p>
        </div>
      </footer>

    </div>
  )
}

export default Home
