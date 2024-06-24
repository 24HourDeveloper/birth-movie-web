import {
  Card,
  CardBody,
  Button,
  Input,
  Heading
} from '@chakra-ui/react'
import { ChangeEvent } from 'react';

type CalendarCardTypes = {
  date: string,
  getDate: () => Promise<void>;
  changeDate: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CalendarCard({ getDate, date, changeDate }: CalendarCardTypes) {
  return (
    <>
      <Card w={["100%","450px"]} size={["sm", 'lg']}>
        <CardBody>
          <Heading as='h2' size={['md','lg']} textTransform="uppercase">Select Your Birth Date</Heading>
          <Input
            id="date"
            placeholder="Enter Your Birthday"
            type="date"
            mt="28px"
            defaultValue={date}
            onChange={changeDate}
          />
          <br />
          <Button
            w="100%"
            mt="28px"
            fontFamily='"Roboto", "Helvetica", "Arial", sans-serif'
            onClick={getDate}
          >
            {"Find Birthday Movie".toUpperCase()}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
