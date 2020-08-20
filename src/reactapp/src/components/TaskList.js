import React, { useState } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ButtonGroup, 
  Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Badge, Button } from 'reactstrap';
import './NavBar.css'
import {giveTaskRecommendations, updateTask} from '../utils'

const TaskList = (props) => {
  const { handleRemoveTask, tab, tasks, handleUpdateTasks, showCompleteTask } = props
  const [nextIntervalModal, setNextIntervalModal] = useState(false);
  const [removeTaskModal, setRemoveTaskModal] = useState(false);
  const [nextRevisionRecommendation, setNextRevisionRecommendation] = useState(1);
  const [archiveTask, setArchiveTask] = useState(false);
  const [currentTask, setCurrentTask] = useState('');

  const handleRecommendation = (archive, nextRecommendation) => {
    setNextRevisionRecommendation(nextRecommendation)
    setNextIntervalModal(true)
    setArchiveTask(archive)
  }
  const handleCompleteTask = (t_id) => {
    giveTaskRecommendations(t_id, handleRecommendation)
    setCurrentTask(t_id)
  }

  const handleArchiveTask = () => {
    updateTask(currentTask, {archive: true}, (tasks) => {
      setNextIntervalModal(false)
      handleUpdateTasks(tasks)
    })
  }

  const handleUpdateTask = () => {    
    updateTask(currentTask, {
          nextRevisionDate: new Date(new Date().getTime() + nextRevisionRecommendation * 24*60*60*1000).toISOString(),
          lastRevisedDate: new Date().toISOString()
      }, (tasks) => {
      setNextIntervalModal(false)
      handleUpdateTasks(tasks)
    })
  }

  const onRemoveClick = (t_id) => {
    setCurrentTask(t_id)
    setRemoveTaskModal(true)
  }

  const handleDeleteTask = () => {
    handleRemoveTask(currentTask)
    setRemoveTaskModal(false)
  }
  
  const toggleNextIntervalModal = () => setNextIntervalModal(!nextIntervalModal);
  const toggleRemoveTaskModal = () => setRemoveTaskModal(!removeTaskModal);

  const getTaskForTab = () => {
    if (tab === "Today") {
      return tasks.filter((task) => task.archive === false && new Date(task.nextRevisionDate).getTime() < new Date().getTime() )
      .sort((task1, task2) => {return new Date(task1.nextRevisionDate) - new Date(task2.nextRevisionDate)})
    } else if (tab === "Upcoming") {
      return tasks.filter((task) => task.archive === false && new Date(task.nextRevisionDate).getTime() >= new Date().getTime() )
      .sort((task1, task2) => {return new Date(task1.nextRevisionDate) - new Date(task2.nextRevisionDate)})
    }
    return tasks.filter((task) => task.archive === true )
                  .sort((task1, task2) => {return new Date(task1.nextRevisionDate) - new Date(task2.nextRevisionDate)})
  }

  const renderRemoveTaskModal = () => {
    return (
      <Modal isOpen={removeTaskModal} toggle={toggleRemoveTaskModal}>
        <ModalHeader toggle={toggleRemoveTaskModal}>Set up your Next Review!</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to remove this task? It'll be gone forever!!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDeleteTask()}>Yes!</Button>{' '}
          <Button onClick={() => toggleRemoveTaskModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  const renderNextIntervalModal = () => {
    return (
      <Modal isOpen={nextIntervalModal} toggle={toggleNextIntervalModal}>
        <ModalHeader toggle={toggleNextIntervalModal}>Set up your Next Review!</ModalHeader>
        <ModalBody>
    <p>Our recommendation is to { archiveTask ? 'archive this task. You nailed it!' : `review in ${nextRevisionRecommendation} ${nextRevisionRecommendation === 1 ? 'day' : 'days'}` }</p>
          <Label for="nextRevisionRecommendation">Days till next review</Label>
          <Input 
            type="text" 
            name="nextRevisionRecommendation" 
            id="nextRevisionRecommendation" 
            value={nextRevisionRecommendation}
            onChange={(e) => setNextRevisionRecommendation(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateTask}>Confirm</Button>{' '}
          <Button color="danger" onClick={handleArchiveTask}>Archive</Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <ListGroup>
      {
        getTaskForTab().map((task) => {
          return (
                <ListGroupItem className="task-list-item" key={task.title}>
                  <Badge className="date-badge" color="secondary">{new Date(task.nextRevisionDate).toDateString()}</Badge>
                  { task.link.length === 0 ?
                    <ListGroupItemHeading tag="span">{task.title}</ListGroupItemHeading>
                  : <ListGroupItemHeading href={task.link} tag="a" target="_blank" rel="noopener noreferrer">{task.title}</ListGroupItemHeading>
                  }
                  <ButtonGroup size="sm">
                    {showCompleteTask && <Button color="success" onClick={() => handleCompleteTask(task.id)}><span>&#10003;</span></Button>}
                    {showCompleteTask && renderNextIntervalModal()}
                    <Button color="danger" onClick={() => onRemoveClick(task.id)}>x</Button>
                    {renderRemoveTaskModal()}
                  </ButtonGroup>
                </ListGroupItem>
        )})
      }
    </ListGroup>
  );
}

export default TaskList;