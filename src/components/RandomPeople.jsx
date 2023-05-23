import { useCallback, useEffect, useState } from 'react';
import { BsFilePersonFill, BsTelephoneFill } from 'react-icons/bs';
import { AiFillCalendar } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { GrMail } from 'react-icons/gr';

function RandomPeople() {
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [filter, setFilter] = useState('name');
  const [resultText, setResultText] = useState('Hi my name is');

  useEffect(() => {
    if (filter === 'name') {
      setResultText('Hi my name is');
    } else if (filter === 'email') {
      setResultText('My email address is');
    } else if (filter === 'address') {
      setResultText('My address is');
    } else if (filter === 'phone') {
      setResultText('My phone number is');
    } else if (filter === 'birthday') {
      setResultText('My birthday is');
    }
    setResult(person[filter]);
  }, [filter, person]);

  const fetchPerson = useCallback(() => {
    setLoading(true);
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const newPerson = {
          name: `${data.results[0].name.first} ${data.results[0].name.last}`,
          email: data.results[0].email,
          address: `${data.results[0].location.street.number} ${data.results[0].location.street.name}, ${data.results[0].location.city} ${data.results[0].location.country}`,
          phone: data.results[0].phone,
          birthday: data.results[0].dob.date.split('T')[0],
          image: data.results[0].picture.large,
        };
        setPerson(newPerson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-2/5 h-2/4 bg-white rounded-lg flex flex-col justify-around items-center">
        <img src={person.image} alt="" className="rounded-full" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-400">{resultText}</p>
          <p className="text-2xl font-bold text-center h-20">{result}</p>
        </div>
        <div className="flex items-center justify-around w-full text-3xl">
          <BsFilePersonFill
            onMouseEnter={() => {
              setFilter('name');
            }}
            className={`${filter === 'name' ? 'text-green-500' : ''}`}
          />
          <GrMail
            onMouseEnter={() => {
              setFilter('email');
            }}
            className={`${filter === 'email' ? 'text-green-500' : ''}`}
          />
          <AiFillCalendar
            onMouseEnter={() => {
              setFilter('birthday');
            }}
            className={`${filter === 'birthday' ? 'text-green-500' : ''}`}
          />
          <ImLocation
            onMouseEnter={() => {
              setFilter('address');
            }}
            className={`${filter === 'address' ? 'text-green-500' : ''}`}
          />
          <BsTelephoneFill
            onMouseEnter={() => {
              setFilter('phone');
            }}
            className={`${filter === 'phone' ? 'text-green-500' : ''}`}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchPerson}
      >
        Next person
      </button>
    </>
  );
}

export default RandomPeople;
