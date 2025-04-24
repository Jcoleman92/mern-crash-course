import { useProductStore } from '@/store/product'
import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import {RiDeleteBin6Fill} from "react-icons/ri"
import { toaster } from './ui/toaster'
import UpdateProductModalButton from './UpdateProductModalButton'

const ProductCard = ({product}) => {
    const {deleteProduct} = useProductStore()
    const handleDelete = async (_id)=>{
        const {success, message} = await deleteProduct(_id)
        toaster.create({
            type: success? "success" : "error",
            description: message
        })
    }

    const textColor = "red.400"
  return (
    <Box
    shadow='lg'
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform:"translateY(5px)",shadow:"xl"}}
    >
        <Image src={product.image} alt={product.name}
        h={48} w={"full"} objectFit={"cover"}/>
        <Box p={4}>
            <Heading>{product.name}</Heading>
            <Text fontWeight={"bold"} fontSize={'xl'} color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spaceX={2}>
                <UpdateProductModalButton product={product}/>
                <IconButton onClick={()=>handleDelete(product._id)} colorPalette={"red"}>
                    <RiDeleteBin6Fill/>
                </IconButton>
            </HStack>
        </Box>
    </Box>
  )
}

export default ProductCard
