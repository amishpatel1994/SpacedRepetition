import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './CreateTaskForm.css'
import { addTask } from '../utils'

const CreateTaskForm = (props) => {
  const { handleCancel } = props
  const [title, setTitle] = useState('Title')
  const [link, setLink] = useState('https://')
  useEffect(() => 
    // eslint-disable-next-line no-undef
    chrome.tabs.getSelected(null, function(tab){
      setTitle(tab.title)
      setLink(tab.url)
    }), [])


  const handleSubmit = () => {
    addTask({title, link}, props.handleSubmit)
  }

  return (
    <Form className="createTaskForm">
      <FormGroup>
        <Label for="title">Title</Label>
        <Input 
          type="text" 
          name="title" 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="link">Link</Label>
        <Input 
          type="text" 
          name="link" 
          id="link"
          value={link} 
          onChange={(e) => setLink(e.target.value)} />
      </FormGroup>
      <Button className="formButtons" onClick={() => handleSubmit()} color="success">Submit</Button>
      <Button className="formButtons" onClick={handleCancel}>Cancel</Button>
    </Form>
  );
}

export default CreateTaskForm;