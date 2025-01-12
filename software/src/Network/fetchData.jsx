// Not used, communication with web socket server

// Base model for fetching to API server
const fetchData = async (input, init) => {
    const response = await fetch(input, init);
    if (response.ok) {
      return response;
    } else {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;
  
      throw Error(
        "Request failed with status: " +
          response.status +
          " message: " +
          errorMessage
      );
    }
  };
  
  // Handler for uploading image data to the server
  export const handleUpload = async (imageData) => {
    // Temp url for testing
    const url = "http://127.0.0.1:8080/";
  
    try {
      const response = await fetchData(url + "image_posting", {
        method: "POST",
        body: imageData,
      });
      // Set artificial delay
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      return { error: error };
    }
  };
  