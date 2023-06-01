// Function to parse remote HTML page
async function parseRemoteHTML(url) {
  try {
    // Fetch the HTML content
    const response = await fetch(url);
    
    // Read the response as text
    const htmlText = await response.text();
    
    // Create a new DOMParser
    const parser = new DOMParser();
    
    // Parse the HTML text into a document
    const doc = parser.parseFromString(htmlText, "text/html");
    
    // Access and manipulate the parsed HTML
    console.log(doc.title); // Print the title of the document
    console.log(doc.body.innerHTML); // Print the content of the body
    
    // Return the parsed document
    return doc;
  } catch (error) {
    console.error("Error parsing remote HTML:", error);
  }
}

// Usage example
const remoteURL = "https://example.com"; // Replace with the desired remote URL
parseRemoteHTML(remoteURL);
