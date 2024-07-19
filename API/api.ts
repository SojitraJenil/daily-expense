import { axiosInstance } from "./axios";

export const registerData = async (
  name: string,
  mobileNumber: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post(`/UserRegister`, {
      name,
      mobileNumber,
      password,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
export const loginData = async (mobileNumber: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/UserLogin`, {
      mobileNumber,
      password,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/UserShow");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const deleteUser = async (id: string) => {
  try {
    await axiosInstance.delete(`/deleteUser/${id}`);
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// =============================Add the expense===========================
export const addExpense = async (formValues: any) => {
  try {
    const response = await axiosInstance.post(`/createExpense`, formValues);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// Get all expenses
export const showAllExpenses = async () => {
  try {
    const response = await axiosInstance.get(`/showAllExpenses`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id: string) => {
  try {
    await axiosInstance.delete(`/deleteExpense/${id}`);
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// Update an expense
export const updateExpense = async (id: string, formValues: any) => {
  try {
    const response = await axiosInstance.put(
      `/updateExpense/${id}`,
      formValues
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// ========================Fuel Details ===========================
export const addFuelDetails = async (formValues: any) => {
  try {
    const response = await axiosInstance.post(`/addFuelDetails`, formValues);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const showAllFuelDetails = async () => {
  try {
    const response = await axiosInstance.get(`/showFuelDetails`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};
// Delete an expense
export const deleteFuelDetails = async (id: string) => {
  try {
    await axiosInstance.delete(`/DeleteFuelDetail/${id}`);
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// Update an expense
export const updateFuelDetails = async (id: string, formValues: any) => {
  try {
    const response = await axiosInstance.put(
      `/UpdateFuelDetail/${id}`,
      formValues
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const ErrorMessage = error.response.data.message;
      return ErrorMessage;
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};