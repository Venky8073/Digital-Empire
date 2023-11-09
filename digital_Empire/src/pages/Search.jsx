import React from 'react'
import { useSelector } from 'react-redux'
import Productcard from '../components/Productcard';
import { Text } from '@chakra-ui/react';

const Search = () => {
  let searchArr = useSelector((store) => store.search);
  return (
    <div>
      {searchArr.length > 0
        ?
        searchArr.map((el) => {
          return <Productcard key={el.id} {...el} />
        })
        : <Text fontSize="5xl" color="tomato" >No results found</Text>}
    </div>
  );
}

export default Search