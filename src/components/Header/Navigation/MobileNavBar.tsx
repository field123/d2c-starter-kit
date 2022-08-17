import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  useDisclosure,
} from "@chakra-ui/react";
import { NavigationNode } from "../../../lib/build-site-navigation";
import CartMenu from "../../cartItems/CartMenu";

import SearchModal from "../../search/SearchModal";
import NavItemContent from "./NavItemContent";

interface IMobileNavBar {
  nav: NavigationNode[];
}

const MobileNavBar = ({ nav }: IMobileNavBar): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid templateColumns="1fr auto 1fr" w="full">
      <GridItem>
        <Button variant="ghost" color="gray.800" onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </GridItem>
      <GridItem>
        <Image src="/icons/ep-icon.svg" alt="EP Icon" minW={10} w={10} h={10} />
      </GridItem>
      <GridItem justifySelf={"end"}>
        <Flex gap={4}>
          <SearchModal />
          <CartMenu />
        </Flex>
      </GridItem>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
        isFullHeight={false}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody>
            <Flex w="100%" as="nav">
              <Accordion w="100%" defaultIndex={[0]} allowToggle>
                {nav &&
                  nav.map((item: NavigationNode, index: number) => (
                    <AccordionItem border={0} key={index}>
                      <h2>
                        <AccordionButton
                          color="gray.800"
                          _expanded={{ color: "brand.primary.blue" }}
                          fontWeight={"bold"}
                          marginBottom={1}
                        >
                          <Box flex="1" textAlign="left">
                            {item.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pl={0} pr={0} pb={14}>
                        <Menu>
                          <NavItemContent item={item} />
                        </Menu>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Grid>
  );
};

export default MobileNavBar;