import React from 'react';
import '../App.less';
import { Button, Col, Collapse, Row, Timeline, Image } from 'antd';
import { Airport, Flight } from '../types';
import { IoIosAirplane } from 'react-icons/io';
import trip from '../images/trip.jpg';

const { Panel } = Collapse;

interface IResultContainerProps {
  origin: Airport,
  destination: Airport,
  flights: Flight[],
  getAirlineName: (id: number) => string,
  getAirportCode: (id: number) => string
}

function ResultContainer({ flights, origin, destination, getAirlineName, getAirportCode }: IResultContainerProps) {

  if (flights.length === 0) {
    return (
      <>
        Oh, no! It looks like there are not flights departing from <b className="text--bold">{origin.codeIata}</b> and going to <b className="text--bold">{destination.codeIata}</b>.
      </>
    );
  }

  else {
    const renderFlight = (f: Flight) => (
      <>
        <Timeline.Item
          dot={<IoIosAirplane />}
          color="gray"
          className="timeline__item--airline"
        >
          { getAirlineName(f.airlineId) }
        </Timeline.Item>
        <Timeline.Item>{ getAirportCode(f.arrivalAirportId) }</Timeline.Item>
      </>
    );
    return (
      <Collapse
        ghost
        expandIconPosition="right"
      >
        <Panel
          key="1"
          header={`${origin.codeIata} — ${destination.codeIata}`}
          extra={`€${flights.reduce((p, c) => p + c.price, 0).toFixed(0)}`}
        >
          <Row justify="space-between" align="middle">
            <Col xs={24} lg={12}>
              <Timeline>
                <Timeline.Item>{ origin.codeIata }</Timeline.Item>
                { flights.map(renderFlight) }
              </Timeline>
            </Col>
            <Col xs={24} lg={8}>
              <Image
                src={trip}
                className="hero-picture"
                preview={false}
              />
            </Col>
          </Row>
          <Row justify="end">
            <Col sm={24} lg={8}>
              <Button
                type="primary"
                size="large"
                className="cta purchase-button"
                style={{ width: '100%' }}
                onClick={() => {}}
              >
                Purchase
              </Button>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    );
  }
}

export default ResultContainer;
