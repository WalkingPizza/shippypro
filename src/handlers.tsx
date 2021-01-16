import { Airline, Airport, APIError, Flight } from "./types";

const apiURL = 'https://recruitment.shippypro.com/flight-engine/api';

const auth = {
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
  }
};

export const getAllFlights = async (): Promise<Flight[] | APIError> => {
  const response = await fetch(`${apiURL}/flights/all`, auth);
  const obj = await response.json();
  return obj.message ? new APIError(obj) : obj.data.map((f: Flight) => new Flight(f));
}

export const getFlights = async (departureCode: string, arrivalCode: string): Promise<Flight[] | APIError> => {
  const response = await fetch(`${apiURL}/flights/from/${departureCode}/to/${arrivalCode}`, auth);
  const obj = await response.json();
  return obj.message ? new APIError(obj) : obj.data.map((f: Flight) => new Flight(f));
}

export const getAllAirports = async (): Promise<Airport[] | APIError> => {
  const response = await fetch(`${apiURL}/airports/all`, auth);
  const obj = await response.json();
  return obj.message ? new APIError(obj) : obj.data.map((a: Airport) => new Airport(a));
}

export const getAllAirlines = async (): Promise<Airline[] | APIError> => {
  const response = await fetch(`${apiURL}/airlines/all`, auth);
  const obj = await response.json();
  return obj.message ? new APIError(obj) : obj.data.map((a: Airline) => new Airline(a));
}