import ProductCard from '@/components/ProductCard'
import { useProductStore } from '@/store/product'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const {products, fetchProducts} = useProductStore()

    useEffect(()=>{
        fetchProducts()
        console.log(products)
    }, [fetchProducts])

  return (
    <Container maxW={"5xl"} py={12}>
        <VStack spaceY={8}>
            <Text
            fontSize={"30px"}
            fontWeight={"bold"}
            bgGradient={"to-r"}
            bgClip={"text"}
            gradientFrom={"cyan.400"}
            gradientTo={"blue.500"}
            textAlign={"center"}
            >
                Current Products 🚀
            </Text>
            {products.length === 0 ?
            <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
            >
                No products found 😢{" "}
                <Link to={"/create"}>
                    <Text as={"span"} color={"blue.500"}
                    _hover={{textDecoration:"underline"}}>
                        Create a product
                    </Text>
                </Link>
            </Text>
            :
            <SimpleGrid
            columns={{
                base:1,
                md:2,
                lg:3
            }}
            rowGap={10}
            columnGap={10}
            w={"full"}
            >
                {products.map((product)=>
                <ProductCard key={product._id} product={product}/>
                )}
            </SimpleGrid>}
        </VStack>

    </Container>
  )
}

export default HomePage
