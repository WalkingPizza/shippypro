export class Airline {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
  }

  id: number;
  name: string;
};

export class Airport {
  constructor(data: any) {
    this.id = data.id;
    this.codeIata = data.codeIata;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

  id: number;
  codeIata: string;
  latitude: string;
  longitude: string;
};

export class Flight {
  constructor(data: any) {
    this.id = data.id;
    this.airlineId = data.airlineId;
    this.departureAirportId = data.departureAirportId;
    this.arrivalAirportId = data.arrivalAirportId;
    this.price = data.price;
  }

  id: number;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  price: number;
};

export class APIError {
  constructor(data: any) {
    this.message = data.message;
  }

  message: string;
}

export enum AirportSelectorType {
  Origin,
  Destination
}