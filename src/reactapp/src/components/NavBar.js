import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './NavBar.css'

const NavBar = (props) => {
  const {activeTab, Tabs, handleTabSwitch } = props

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
      
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tabs[0]}>
          <Row>
            <Col sm="12">
              <h4>{Tabs[0]}</h4>
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