import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, ListGroupItemHeading, ButtonGroup, ListGroupItemText, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './NavBar.css'

const NavBar = (props) => {
  const {activeTab, Tabs, handleTabSwitch, tasks } = props
  console.log(tasks)
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
                              <Button color="success"><span>&#10003;</span></Button>
                              <Button color="danger">x</Button>
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