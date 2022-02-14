import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insert } from "../store/slices/productSlice";

import { getCurrentDate } from "../utils/dateUtil";

import Head from "next/head";
import Router, { useRouter } from "next/router";
import Menu from "../components/Menu";

import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

export default function Add() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productValue, setProductValue] = useState(0);

  const dispatch = useDispatch();
  const currentDate = getCurrentDate();
  const router = useRouter();

  const handleAddProduct = () => {
    if (productName !== "" && productCategory !== "" && productValue !== "") {
      dispatch(
        insert({
          productName,
          category: productCategory,
          totalValue: parseInt(productValue),
          dateMade: currentDate,
        })
      );
      router.push("/");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <>
      <Head>
        <title>Stock Management</title>
      </Head>
      <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
        {/* Column 1 - Menu */}
        <Menu />

        {/* Column 2 - AddArea */}
        <Flex
          w="85%"
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh"
          background="#fff"
        >
          <Heading fontWeight="normal" mb={12} letterSpacing="tight">
            Adicionar Nova Transação
          </Heading>

          <FormControl>
            <FormLabel htmlFor="product-name">Nome do Produto:</FormLabel>
            <Input
              id="product-name"
              placeholder="ex: Macbook Pro M1"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormControl>
          <br />

          <FormControl>
            <FormLabel htmlFor="category">Categoria:</FormLabel>
            <Select
              id="category"
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option></option>
              <option>Venda</option>
              <option>Compra</option>
            </Select>
          </FormControl>
          <br />

          <FormControl>
            <FormLabel htmlFor="product-price">Valor:</FormLabel>
            <NumberInput max={99999} min={1} value={productValue}>
              <NumberInputField
                id="product-price"
                placeholder="Valor total da transação"
                onChange={(e) => setProductValue(e.target.value)}
              />
            </NumberInput>
          </FormControl>
          <br />

          <Button
            mt={4}
            background="#000"
            color="#fff"
            _hover={false}
            type="submit"
            onClick={handleAddProduct}
          >
            Cadastrar Transação
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
