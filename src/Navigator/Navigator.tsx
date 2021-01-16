import React from 'react';
import '../App.less';
import { Input, Button, AutoComplete } from 'antd';
import { Airport, AirportSelectorType } from '../types';

interface INavigatorProps {
  airports: Airport[],
  onAirportChange: (selectedAirport: string, point: AirportSelectorType) => void,
  onSearchFlight: () => any
}

function Navigator({ airports, onSearchFlight, onAirportChange }: INavigatorProps) {
  const airportOptions = airports.map((airport: Airport) => {
    return {
      value: airport.codeIata
    }
  });

  const filterAirports = (inputValue: string, option: any) => {
    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  }

  return (
    <Input.Group
      compact
      style={{
        boxShadow: '0 4px 6px 0px rgba(0, 0, 0, 0.05), 0 0px 4px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        padding: '5px'
      }}
    >
      <AutoComplete
        options={airportOptions}
        filterOption={(inputValue, option) => filterAirports(inputValue, option)}
        onSelect={(selectedOption) => onAirportChange(selectedOption, AirportSelectorType.Origin)}
        className="navigator__input"
      >
        <Input
          bordered={false}
          style={{
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
            height: '50px',
            borderRight: '1px solid #EFF3F7'
          }}
          size="large"
          placeholder="Flying from..."
        />
      </AutoComplete>
      <AutoComplete
        className="navigator__input"
        options={airportOptions}
        filterOption={(inputValue, option) => filterAirports(inputValue, option)}
        onSelect={(selectedOption) => onAirportChange(selectedOption, AirportSelectorType.Destination)}
      >
        <Input
          bordered={false}
          style={{height: '50px'}}
          size="large"
          placeholder="Flying to..."
        />
      </AutoComplete>
      <Button
        type="primary"
        size="large"
        className="cta navigator__button"
        style={{
          borderRadius: '20px'
        }}
        onClick={onSearchFlight}
      >
        Find Options
      </Button>
    </Input.Group>
  );
}

export default Navigator;
