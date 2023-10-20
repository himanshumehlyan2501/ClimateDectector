import React, { useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Navbar, Form, Button, Row, Col, Container } from "react-bootstrap";
import CityImage from "./photo";
import Spinner from "react-bootstrap/Spinner";

function Demo({
  name,
  Country,
  Region,
  temp_c,
  temp_f,
  wind_speed,
  pressure,
  humidity,
  time
  
}) {
  return (
    <div >
      <Container style={{ marginTop:'100px',marginLeft: "200px", alignContent: "center" }}>
        <Card  style={{width: "100%", borderRadius: "30px",padding:'10px' }}>
        <Row>
        <Col sm={5}>
          <CityImage cityName={name} />
          </Col>
          <Col sm={7}>
          <Card.Body>
            <Card.Title style={{fontSize:'2rem',fontWeight:'600w'}} inline={'true'}><i class="fa-solid fa-city  fa-xl"style={{color: '#53b5df'}}></i>  {name}</Card.Title>
            <br/>
            <div>
            <Card.Text inline={'true'} className="justify-content-end" > <b>Current Time :</b><i  class="fa-solid fa-clock fa-beat" style={{color: '#53b5df',paddingLeft:'15px'}}></i> {time}</Card.Text>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush ">
            <ListGroup.Item>
              <p id="p"><i class="fa-solid fa-flag"style={{color: '#53b5df'}}></i>    Region:</p>
              {Region}
            </ListGroup.Item>
            <ListGroup.Item>
              <p id="p"><i class="fa-solid fa-earth"style={{color: '#53b5df'}}></i>    Country Name:</p>
              {Country}
            </ListGroup.Item>
            <ListGroup.Item>
              <p id="p"><i class="fa-solid fa-temperature-three-quarters fa-beat-fade" style={{color: '#7aa5f0'}}></i>   Temperature in celsius:</p>
              {temp_c}
            </ListGroup.Item>
            <ListGroup.Item>
              <p id="p"><i class="fa-solid fa-temperature-full" style={{color: '#7aa5f0'}}></i>   Temperature in fahrenheit:</p>
              {temp_f}
            </ListGroup.Item>
            <ListGroup.Item>
              <p id="p"><i class="fa-solid fa-wind fa-bounce fa-lg" style={{color: '#7aa5f0'}}></i>   Wind Speed: </p>
              {wind_speed}
            </ListGroup.Item>
            <ListGroup.Item>
              <p id="p"> <i class="fa-solid fa-temperature-arrow-up fa-beat" style={{color: '#7aa5f0'}}></i>   Pressure in city:</p>
              {pressure}
            </ListGroup.Item>
            <ListGroup.Item>
              <p id="p"> <i class="fa-solid fa-droplet fa-shake "  style={{color: '#53b5df'}}></i>   Humidity:</p>
              {humidity}
            </ListGroup.Item>
          </ListGroup>
          </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

function Errors(){
return(<div>
  <Container style={{alignContent:'center'}}>
  <br/>
  <br/>
  <p style={{ textAlign:'center', fontSize:'70px',color:'#0f0f0f'}}>No Data Found Please Input Correct value</p>
  <br/>
  <br/>
  <img style={{marginLeft:'300px'}} src="https://media.istockphoto.com/id/1149317024/vector/emoticon-with-sorry-sign.jpg?s=612x612&w=0&k=20&c=wwaOI9ajJ9l8ImT7BgdD0joDR2if0tlydqXEyMUl3d8="
   alt="sorry"></img>
  </Container>
  </div>)
}

const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=`;

function Fetch() {
  const apiKey = "b8371b99dfmsheb283f976f1d63ap145bc5jsn0376605e40aa";

  const [val, setVal] = useState();
  const [arr, setArr] = useState([]);
  const [loop, setLoop] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setVal(""); 
    setArr([]); 
    setError(null); 
  };

  const headers = new Headers({
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setLoop(true);

    try {
      const res = await fetch(`${apiUrl}${val.toUpperCase()}`, {
        method: "GET",
        headers: headers,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setArr([data]);
      setLoop(false);
      setError(null);
    } catch (e) {
      console.error("Error:", e.message);
      setArr([]);
      setError(Errors);
      setLoop(false);
    }
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-between">
        <h1 style={{ color: "#4D4C7D" }}>Climate Report</h1>
        <Form inline={"true"}>
          <Row>
            {loop && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" onClick={handleClick}>
                Submit
              </Button>
              <Button variant="danger" onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>

      {error ? (
        <div>
          <h3>{error}</h3>
        </div>
      ) : (
        arr &&
        arr.map(({ current, location }) => {
          return (
            <Demo
              name={location.name}
              Country={location.country}
              Region={location.region}
              temp_c={current.temp_c}
              temp_f={current.temp_f}
              wind_speed={current.wind_kph}
              pressure={current.pressure_in}
              humidity={current.humidity}
              icon={current.icon}
              time={location.localtime}
            />
          );
        })
      )}
    </div>
  );
}

export default Fetch;
