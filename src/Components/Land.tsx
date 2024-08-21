// src/Land.tsx
import React from "react";
import { Box, Text, Heading, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../Utils/i18n";

interface LandProps {
  title: string;
  name: string;
  location: string;
  size: string;
  owner: string;
  land_type: string;
  market_value: string;
  notes?: string;
}

const Land: React.FC<LandProps> = ({
  title,
  name,
  location,
  size,
  owner,
  land_type,
  market_value,
  notes,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="md"
      maxW="md"
      mx="auto"
    >
      <Heading as="h3" size="lg" mb={4} color="teal.600">
        {t("landDetails")}
      </Heading>
      <VStack align="start" spacing={3}>
        <Text><strong>{t("name")}:</strong> {name}</Text>
        <Text><strong>{t("location")}:</strong> {location}</Text>
        <Text><strong>{t("size")}:</strong> {size}</Text>
        <Text><strong>{t("owner")}:</strong> {owner}</Text>
        <Text><strong>{t("landType")}:</strong> {land_type}</Text>
        <Text><strong>{t("marketValue")}:</strong> {market_value}</Text>
        <Text><strong>Current Language:</strong> {getCurrentLanguage()}</Text>
        {notes && (
          <Text><strong>{t("notes")}:</strong> {notes}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Land;
