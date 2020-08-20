import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './NavBar.css'
import TaskList from './TaskList'

const NavBar = (props) => {
  const {activeTab, Tabs, handleTabSwitch, handleRemoveTask, tasks, handleUpdateTasks } = props

  return (
    <div className="nav-container">
      <Nav tabs>
          {
            Tabs.map(tab => {
              return (
                <NavItem key={tab}>
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
              <TaskList 
                tab={Tabs[0]}
                handleRemoveTask={handleRemoveTask} 
                tasks={tasks} 
                handleUpdateTasks={handleUpdateTasks} 
                showCompleteTask={true}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={Tabs[1]}>
          <Row>
            <Col sm="12">
              <TaskList 
                  tab={Tabs[1]}
                  handleRemoveTask={handleRemoveTask} 
                  tasks={tasks} 
                  handleUpdateTasks={handleUpdateTasks} 
                  showCompleteTask={false}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={Tabs[2]}>
          <Row>
            <Col sm="12">
            <TaskList 
                tab={Tabs[2]}
                handleRemoveTask={handleRemoveTask} 
                tasks={tasks} 
                handleUpdateTasks={handleUpdateTasks} 
                showCompleteTask={false}
            />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default NavBar;