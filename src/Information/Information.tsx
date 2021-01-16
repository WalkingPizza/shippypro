import React from 'react';
import '../App.less';
import { Airline} from '../types';

interface IInformationProps {
  airlines: Airline[]
}

function Information({ airlines }: IInformationProps) {
  return (
    <>
      ShippyPro has partnered up with <b className="text--bold">{airlines.length}</b> airlines to provide you with the best prices out there.<br />
      Start by choosing the city you are flying from and the city you want to fly to.
    </>
  );
}

export default Information;
