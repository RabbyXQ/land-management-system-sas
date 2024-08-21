import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <HStack position="fixed" top="1rem" left="1rem" spacing={4}>
      <Button onClick={() => changeLanguage('en')}>English</Button>
      <Button onClick={() => changeLanguage('bn')}>বাংলা</Button>
    </HStack>
  );
};

export default LanguageSwitcher;
