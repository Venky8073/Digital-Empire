import React from 'react';
import { Skeleton } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Skeleton
      bg='green.500'
      color='white'
      fadeDuration={2}
      height="5rem"
      width="100%"
    >
      Products are loading....
    </Skeleton>
  )
}

export default Loading;