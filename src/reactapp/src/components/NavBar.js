import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, ListGroupItemHeading, ButtonGroup, ListGroupItemText, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './NavBar.css'
import {giveTaskRecommendations} from '../utils'

const NavBar = (props) => {
  const {activeTab, Tabs, handleTabSwitch, handleRemoveTask, tasks } = props

  const handleCompleteTask = (t_id) => {
    console.log(giveTaskRecommendations(t_id))
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
                  tasks.map((task) => {
                    return (
                      task.link && task.link.length === 0 ?
                        <ListGroupItem>{task.title}</ListGroupItem>
                        : <ListGroupItem className="task-list-item">
                            <ListGroupItemHeading href={task.link} tag="a" target="_blank" rel="noopener noreferrer">{task.title}</ListGroupItemHeading>
                            <ButtonGroup size="sm">
                              <Button color="success" onClick={() => handleCompleteTask(task.id)}><span>&#10003;</span></Button>
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
              <h4>{Tabs[1]}</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default NavBar;