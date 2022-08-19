import { Box, Heading, Tag } from "@chakra-ui/react";
import type { ProductResponse } from "@moltin/sdk";
import { useContext } from "react";
import { changingSkuStyle, productContext } from "../../lib/product-util";
import Price from "./Price";
import StrikePrice from "./StrikePrice";

interface IProductSummary {
  product: ProductResponse;
}

const ProductSummary = ({ product }: IProductSummary): JSX.Element => {
  const {
    attributes,
    meta: { display_price, original_display_price },
  } = product;
  const context = useContext(productContext);

  return (
    <Box as={"header"} {...(context?.isChangingSku ? changingSkuStyle : {})}>
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "xl", sm: "3xl", lg: "4xl" }}
      >
        {attributes.name}
      </Heading>
      <Tag marginTop={4}> {attributes.sku}</Tag>
      {display_price && (
        <Box display={"flex"} alignItems={"center"}>
          <Price
            price={display_price.without_tax.formatted}
            currency={display_price.without_tax.currency}
          />
          {original_display_price && (
            <StrikePrice
              price={display_price.without_tax.formatted}
              currency={display_price.without_tax.currency}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProductSummary;
