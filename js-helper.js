/**
 * Gets the processing page
 * @param {array} data
 */
async function getProcessingPage(data) {
  let result;

  function delay() {
    return new Promise((resolve, reject) => setTimeout(resolve, 2000));
  }

  for (const item of data) {
    if (item.state === "processing") {
      await delay();
    } else if (item.state === "error") {
      switch (item.errorCode) {
        case "NO_STOCK":
          result = { title: "Error page", message: "No stock has been found" };
          break;
        case "INCORRECT_DETAILS":
          result = {
            title: "Error page",
            message: "Incorrect details have been entered",
          };
          break;
        default:
          result = { title: "Error page", message: null };
          break;
      }
    } else if (item.state === "success") {
      result = { title: "Order complete", message: null };
    }
  }
  return result;
}

getProcessingPage([{ state: "processing" }, { state: "error" }]).then((data) =>
  console.log(data)
);
