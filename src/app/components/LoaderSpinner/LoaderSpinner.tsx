import React from 'react';
import Image from 'next/image';

const LoaderSpinner = () => {
  return (
    <Image src="/spinner.svg" alt="spinner" width={50} height={50} priority />
  );
};

export default LoaderSpinner;
