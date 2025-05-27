export const callAPi = async ({ url, method, data }) => {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3000";
    const newUrl = apiUrl + url;
    const response = await fetch(newUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(data),
    });

    const output = await response.json();
    const res = {
      data: output,
      status: response.status,
    };
    return res;
  } catch (e) {
    return console.log("Oops! something went wrong", e);
  }
};

module.exports = {
  callAPi,
};
