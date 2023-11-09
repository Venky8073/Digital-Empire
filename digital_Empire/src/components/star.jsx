import { Flex } from "@chakra-ui/react"
import { FaStar } from "react-icons/fa"
export const Star=({ rating })=>{
    const maxRating = 5
    return(
        <div style={{ display: 'flex', margin:"auto"}}>
        {[...Array(maxRating)].map((_, index) => (
          <FaStar
            key={index}
            color={index < rating ? 'gold' : 'grey'}
            size={30}
          />
        ))}
      </div>
    
    )

}