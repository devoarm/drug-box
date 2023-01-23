export const getHttp = async (path: string): Promise<any> => {
  const res = await fetch(`http://localhost:3000/api/${path}`);
  // need to do this with fetch since doesn't automatically throw errors axios and graphql-request do
  try {
    if (res.ok) {
      return res.json();
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
export const postHttp = async (path: string, data: any): Promise<any> => {
  const res = await fetch(`http://localhost:3000/api/${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // need to do this with fetch since doesn't automatically throw errors axios and graphql-request do
  try {
    if (res.ok) {
      return res.json();
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
