import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, Input, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC } from "react";

type CreateItemModalProps = {
    isOpenItemModal: boolean;
    onToggleItemModal: () => void;
}

const CreateItemModal: FC<CreateItemModalProps> = ({
    isOpenItemModal,
    onToggleItemModal
}) => {
    
    return (
        <>
            <Drawer
            isOpen={isOpenItemModal}
            placement='right'
            onClose={onToggleItemModal}
            size={"md"}
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create Item</DrawerHeader>

                <DrawerBody>
                    <FormControl>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter Item Name"
                            variant={"filled"}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <Input
                            id="start_price"
                            name="start_price"
                            placeholder="Enter Start Price"
                            variant={"filled"}
                            type={"number"}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <Input
                            id="duration"
                            name="duration"
                            placeholder="Enter Duration"
                            variant={"filled"}
                            type={"number"}
                        />
                    </FormControl>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onToggleItemModal}>
                    Cancel
                </Button>
                <Button colorScheme='teal'>Save</Button>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </>
    );
};

export default CreateItemModal;