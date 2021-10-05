const saveToStore = async (key, value) => {
  try {
    //await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const getFromStore = async (key) => {
  let response;

  try {
    //response = await SecureStore.getItemAsync(key);
  } catch (e) {
    console.log(e);
  }
  return response ? JSON.parse(response) : null;
};

const deleteFromStore = async (key) => {
  try {
    //await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.log(e);
  }
};

export { getFromStore, saveToStore, deleteFromStore };
