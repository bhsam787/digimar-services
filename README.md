# Business Service Listing

This project includes a proxy server that needs to be started before using the application.

## How to Run (Locally)

1. Open a terminal and navigate to the `proxy` folder:

   ```bash
   cd proxy

2. Install the dependencies:
    ```bash
   npm install
4. Start the proxy server:
    ```bash
   npm start

## How to Run on Symphony
No need need node module and proxy folder. on "business-service-component.js"  uncomment following lines

 ```bash
async fetchBusinessData() {
    try {
      // const response = await fetch('https://dev.emerchantauthority.com/api/business', {
      // Not using this for now because it gives CORS origin error. If this codes will be in the symfony app, then it will work.

      const response = await fetch('/api/business', {
        // used "/api/business" from a local server to avoid CORS issues
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '7478b4a8f4632828edf3176c1d860915',
        },
      });
      return await response.json();
    } catch (err) {
      console.error('❌ Failed to fetch business data', err);
      return null;
    }
  }

 ```bash

async sendLeadData(payload) {
    try {
      // const response = await fetch('https://dev.emerchantauthority.com/api/lead', {
      // Not using ths for now because it gives cors origin error. If this codes will be in the symfony app, then it will work.
      const response = await fetch('/api/lead', {
        // used "/api/lead" from a local server to avoid CORS issues

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      // Handle error response
      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          error: this.extractValidationErrors(responseData),
        };
      }

      // Handle success response
      return {
        success: true,
        status: response.status,
        data: responseData,
      };
    } catch (error) {
      console.error('❌ Error while sending lead data:', error.message);
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }


