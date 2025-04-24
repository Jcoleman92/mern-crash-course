import { useColorModeValue } from '@/components/ui/color-mode'
import { toaster } from '@/components/ui/toaster'
import { useProductStore } from '@/store/product'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'


const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name:"",
        price:"",
        image:""
    })
    const updateFormData = (e)=>{
        setNewProduct({...newProduct,[e.target.name]:e.target.value})
    }

    const {createProduct} = useProductStore()
    const handleAddProduct = async ()=>{
        const {success,message} = await createProduct(newProduct)
        toaster.create({
            title: success? "Success" : "Failed",
            description: message,
            type: success? "success" : "error",
        })
        setNewProduct({name:"",price:"",image:""})
    }
    return (
        <Container maxW={"2xl"}>
            <VStack spaceY={8}>
                <Heading as={"p"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"} bg={useColorModeValue("gray.300","gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spaceY={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={updateFormData}
                        />
                        <Input
                            placeholder='Product Price'
                            name='price'
                            value={newProduct.price}
                            onChange={updateFormData}
                        />
                        <Input
                            placeholder='Product Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={updateFormData}
                        />
                        <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage
