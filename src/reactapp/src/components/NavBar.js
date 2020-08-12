import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, ListGroupItemHeading, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Badge,ListGroupItemText, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './NavBar.css'
import {giveTaskRecommendations, updateTask} from '../utils'
import NextIntervalModal from './NextIntervalModal'

const NavBar = (props) => {
  const {activeTab, Tabs, handleTabSwitch, handleRemoveTask, tasks, handleUpdateTasks } = props
  const [nextIntervalModal, setNextIntervalModal] = useState(false);
  const [nextRevisionRecommendation, setNextRevisionRecommendation] = useState(1);
  const [archiveTask, setArchiveTask] = useState(false);
  const [currentTask, setCurrentTask] = useState('');

  const handleRecommendation = (archive, nextRecommendation) => {
    console.log("This is supposed to be the next recommendation", nextRecommendation)
    setNextRevisionRecommendation(nextRecommendation)
    setNextIntervalModal(true)
    setArchiveTask(archive)
  }
  const handleCompleteTask = (t_id) => {
    const nextRecom = giveTaskRecommendations(t_id, handleRecommendation)
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
      console.log("wowwoowow")
      console.log(tasks)
      handleUpdateTasks(tasks)
    })
  }
  
  const toggleNextIntervalModal = () => setNextIntervalModal(!nextIntervalModal);

  const renderNextIntervalModal = () => {
    return (
      <Modal isOpen={nextIntervalModal} toggle={toggleNextIntervalModal}>
        <ModalHeader toggle={toggleNextIntervalModal}>Set up your Next Review!</ModalHeader>
        <ModalBody>
    <p>Our recommendation is to { archiveTask ? 'archive this task. You nailed it!' : `review in ${nextRevisionRecommendation} ${nextRevisionRecommendation == 1 ? 'day' : 'days'}` }</p>
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
    <div className="nav-container">
      <Nav tabs>
          {
            Tabs.map(tab => {
              return (
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === tab })}
                    onClick={() => { handleTabSwitch(tab) }}
                  >
                    {tab}
                  </NavLink>
                </NavItem>
              )
            })
          }
      </Nav>
      
      <TabContent activeTab={activeTab} className="tab-content-container">
        <TabPane tabId={Tabs[0]}>
          <Row>
            <Col sm="12">
              <ListGroup>
                {
                  tasks.filter((task) => task.archive === false && new Date(task.nextRevisionDate).getTime() < new Date().getTime() )
                    .map((task) => {
                    return (
                      task.link && task.link.length === 0 ?
                        <ListGroupItem className="task-list-item">{task.title}</ListGroupItem>
                        : <ListGroupItem className="task-list-item">
                            <ListGroupItemHeading href={task.link} tag="a" target="_blank" rel="noopener noreferrer">{task.title}</ListGroupItemHeading>
                            <ButtonGroup size="sm">
                              <Button color="success" onClick={() => handleCompleteTask(task.id)}><span>&#10003;</span></Button>
                              {renderNextIntervalModal()}
                              <Button color="danger" onClick={() => handleRemoveTask(task.id)}>x</Button>
                            </ButtonGroup>
                          </ListGroupItem>
                  )})
                }
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={Tabs[1]}>
          <Row>
            <Col sm="12">
              <ListGroup>
                {
                  tasks.filter((task) => task.archive === false && new Date(task.nextRevisionDate).getTime() >= new Date().getTime() )
                    .map((task) => {
                    return (
                      task.link && task.link.length === 0 ?
                      <ListGroupItem className="task-list-item">{task.title}<Badge className="date-badge" color="secondary">{new Date(task.nextRevisionDate).toLocaleDateString()}</Badge></ListGroupItem>
                        : <ListGroupItem className="task-list-item">
                            <Badge className="date-badge" color="secondary">{new Date(task.nextRevisionDate).toLocaleDateString()}</Badge>
                            <ListGroupItemHeading href={task.link} tag="a" target="_blank" rel="noopener noreferrer">{task.title}
                            </ListGroupItemHeading>
                            <ButtonGroup size="sm">
                              <Button color="danger" onClick={() => handleRemoveTask(task.id)}>x</Button>
                            </ButtonGroup>
                          </ListGroupItem>
                  )})
                }
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={Tabs[2]}>
          <Row>
            <Col sm="12">
              <ListGroup>
                {
                  tasks.filter((task) => task.archive === true )
                    .map((task) => {
                    return (
                      task.link && task.link.length === 0 ?
                        <ListGroupItem className="task-list-item">{task.title}</ListGroupItem>
                        : <ListGroupItem className="task-list-item">
                            <ListGroupItemHeading href={task.link} tag="a" target="_blank" rel="noopener noreferrer">{task.title}</ListGroupItemHeading>
                            <ButtonGroup size="sm">
                              <Button color="danger" onClick={() => handleRemoveTask(task.id)}>x</Button>
                            </ButtonGroup>
                          </ListGroupItem>
                  )})
                }
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default NavBar;