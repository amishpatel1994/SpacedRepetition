import React, { useState, useEffect } from 'react';
import logo from './logo1.svg';
import './App.css';
import { Container, Row, Col, Button } from 'reactstrap';
import NavBar from './components/NavBar'
import CreateTaskForm from './components/CreateTaskForm'
import {removeTask} from './utils'

const App = () => {
  const tabs = ['Today', 'Upcoming', 'Completed Tasks']
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [createTask, setCreateTask] = useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => 
    chrome.storage.local.get(['tasks'], (result) => {
      setTasks(result['tasks'] || [])
    }), [])

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab)
  }

  const handleCreateFormSubmit = (tasks) => {
    setCreateTask(false)
    setTasks(tasks)
  }

  const handleRemoveTask = (task_id) => {
    removeTask(task_id, setTasks)
  } 

  const handleCompleteTask = (task_id) => {
    
  }
  
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs="1"><img src={logo} alt="logo" className="App-logo"/></Col>
          <Col xs="auto"><h3>Spaced Repetition</h3></Col>
          {!createTask &&
            <Col xs="4"><Button color="success" onClick={() => setCreateTask(true)}>Create Task</Button></Col>
          }
        </Row>
        <Row>
          {
            createTask ?
              <CreateTaskForm 
                handleSubmit={handleCreateFormSubmit}
                handleCancel={() => setCreateTask(false)}
              />
            :
            <NavBar
            Tabs={tabs} 
            activeTab={activeTab} 
            handleTabSwitch={handleTabSwitch}
            handleRemoveTask={handleRemoveTask}
            handleCompleteTask={handleCompleteTask}
            tasks={tasks} />
          }
        </Row>
      </Container>
    </div>
  );
}

export default App;
