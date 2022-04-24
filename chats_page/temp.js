import { useState } from "react"; // import useState
import { Form } from "react-bootstrap";
export function Tmp(){
    const [name, setName] = useState(""); // useState hook

    // handle change event
    const handleChange = (e) => {
      e.preventDefault(); // prevent the default action
      setName(e.target.value); // set name to e.target.value (event)
    };
  
    // render
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Control
              value={name}
              type="text"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
        </Form>
        <p>{name}</p>
      </div>
    );
} 