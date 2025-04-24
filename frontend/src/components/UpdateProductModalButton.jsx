import { Box, Button, CloseButton, Dialog, IconButton, Input, Portal, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '@/store/product'
import { toaster } from './ui/toaster'
import { FaEdit } from 'react-icons/fa'

const UpdateProductModalButton = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name:product.name,
        price:product.price,
        image:product.image
    })
    const updateFormData = (e)=>{
        setUpdatedProduct({...updatedProduct,[e.target.name]:e.target.value})
    }

    const [open, setOpen] = useState(false)

    const {updateProduct} = useProductStore()
    const handleUpdateProduct = async (id)=>{
        const {success,message} = await updateProduct(id,updatedProduct)
        toaster.create({
            title: success? "Success" : "Failed",
            description: message,
            type: success? "success" : "error",
        })
        setOpen(!success)
    }
  return (
    <Dialog.Root size={"xl"} open={open} placement={"center"}
      onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Trigger asChild>
            <IconButton colorPalette={"blue"}>
                <FaEdit/>
            </IconButton>
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size={"sm"}/>
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title>Update Product</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Box
                            w={"full"} bg={useColorModeValue("gray.300","gray.800")}
                            p={6} rounded={"lg"} shadow={"md"}
                        >
                            <VStack spaceY={4}>
                                <Input
                                    placeholder='Product Name'
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={updateFormData}
                                />
                                <Input
                                    placeholder='Product Price'
                                    name='price'
                                    value={updatedProduct.price}
                                    onChange={updateFormData}
                                />
                                <Input
                                    placeholder='Product Image URL'
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={updateFormData}
                                />
                            </VStack>
                        </Box>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button colorPalette={"blue"}
                        onClick={()=>handleUpdateProduct(product._id)}>
                            Update Product
                        </Button>
                        <Button variant={"ghost"} onClick={()=>setOpen(false)}>
                            Cancel
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}

export default UpdateProductModalButton
