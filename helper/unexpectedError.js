const unexpectedError = (error) => {
  console.log(error);
  const errorResponse = {
    data: {
      inError: true,
      errorMessage: 'Unexpected error has occurred',
    },
  };
  return errorResponse;
};

export { unexpectedError };
