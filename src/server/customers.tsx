import api from "./api";

export const getCustomers = async (
) => {
  await api
    .get("v1/customer/list")
    .then((res: { data: {data: object} }) => {
      console.log("get Customer Success", res);
      return res.data;
    })
    .catch((err: Error) => {
      console.log("get Customer Error", err);

    });
};
export const createCustomer = async (
  data: object,
  onSuccess: () => void,
  onError: () => void
) => {
  await api
    .post("v1/customer", data)
    .then(() => {
      onSuccess();
    })
    .catch((err: Error) => {
      onError();
      console.log("Customer Action Error ", err);
    });
};

export const getCustomerByID = async (
  id: number,
  onSuccess: () => void,
  onError: () => void
) => {
  await api
    .get(`v1/customer/${id}`)
    .then((res: { data: object }) => {
      console.log("get Customer by ID Success", res);
      onSuccess();
    })
    .catch((err: Error) => {
      onError();
      console.log("get Customer by ID Error", err);
    });
};

export const updateCustomer = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: number,
  element: object,
  onSuccess: () => void,
  onError: () => void
) => {
  await api
    .put(`v1/customer/${id}`, element)
    .then((res: { data: object }) => {
      console.log("update Customer Success", res);
      onSuccess();
    })
    .catch((err: Error) => {
      onError();
      console.log("update Customer Error", err);
    });
};

export const deleteCustomer = async (
  id: number,
  onSuccess: () => void,
  onError: () => void
) => {
  await api
    .delete(`v1/customer/${id}`)
    .then((): void => {
      console.log("Delete Customer Successfully");
      onSuccess();
    })
    .catch((Err) => {
      console.log("Delete Customer Failed", Err);
      onError();
    });
};
