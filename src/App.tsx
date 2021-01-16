import React, { useEffect, useState } from 'react';
import './App.less';
import { getAllAirlines, getAllAirports, getFlights } from './handlers';
import { Airline, Airport, AirportSelectorType, Flight } from './types';
import Navigator from "./Navigator/Navigator";
import { Card, Image, Col, Row, Space, Typography, Spin } from 'antd';
import ResultContainer from './ResultContainer/ResultContainer';
import travel from './images/travel.jpg';
import logo from './images/shippypro.svg';
import Information from './Information/Information';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flights, setFlights] = useState<Flight[]>();
  const [airports, setAirports] = useState<Airport[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [origin, setOrigin] = useState<Airport>();
  const [destination, setDestination] = useState<Airport>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const updateAirports = async () => {
      const airportsData = await getAllAirports();
      "message" in airportsData ? setError(airportsData.message) : setAirports(airportsData);
    }
  
    const updateAirlines = async () => {
      const airlinesData = await getAllAirlines();
      "message" in airlinesData ? setError(airlinesData.message) : setAirlines(airlinesData);
    }

    if (airports.length === 0) {
      updateAirports();
    }

    if (airlines.length === 0) {
      updateAirlines();
    }

    setIsLoading(false);
  }, [airlines, airports]);

  const handleSearchFlight = async () => {
    setIsLoading(true);
    const flights = await getFlights(origin!.codeIata, destination!.codeIata);
    "message" in flights ? setError(flights.message) : setFlights(flights);
    setIsLoading(false);
  }

  const handleAirportChange = (airport: string, point: AirportSelectorType) => {
    setIsLoading(true);
    setFlights(undefined);
    const newAirport = airports!.find((a) => a.codeIata === airport);
    point === AirportSelectorType.Origin ? setOrigin(newAirport): setDestination(newAirport);
    new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  }

  const getAirportCode = (id: number) => {
    return airports.find((a) => a.id === id)!.codeIata;
  }

  const getAirlineName = (id: number) => {
    return airlines.find((a) => a.id === id)!.name;
  }

  if (error) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ textAlign: "center" }}
      >
        <Col xs={20}>
          <Title>Oh no, something went wrong!</Title>
        </Col>
        <Col xs={20}>
          <p>{error}</p>
        </Col>
      </Row>
    )
  }
  
  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row align="middle" justify="center">
          <Col xs={20} lg={6}>
            <Image preview={false} src={logo} className="logo" />
            <Title id="title" style={{ margin: 0 }}>
              Let the journey begin.
            </Title >
          </Col>
          <Col sm={10} lg={4}>
            <Image
              src={travel}
              className="hero-picture"
              preview={false}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={20} lg={10}>
            <Navigator
              airports={airports}
              onAirportChange={handleAirportChange}
              onSearchFlight={handleSearchFlight}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={20} lg={10}>
            <Card
              bordered={false}
              style={{
                boxShadow: '0 4px 6px 0px rgba(0, 0, 0, 0.05), 0 0px 4px 0px rgba(0, 0, 0, 0.05)',
                borderRadius: '20px'
              }}
            >
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={isLoading}
              >
                { 
                  (!flights && <Information airlines={airlines} />) ||
                  (!isLoading && (
                    <ResultContainer
                      getAirlineName={getAirlineName}
                      getAirportCode={getAirportCode}
                      origin={origin!}
                      destination={destination!}
                      flights={flights!}
                    />
                  ))
                }
              </Spin> 
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export default App;
