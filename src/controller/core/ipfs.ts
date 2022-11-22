// The 'axios' module gives a promised-based HTTP client.
const axios = require('axios');

// The 'fs' builtin module provides us access to the file system.
const fs =  require("fs");

// The 'form-data' builtin module helps us submit forms and file uploads
// to other web applications.
const FormData =  require("form-data");
/**
 * Uploads a file from `filepath` and pins it to the Storj IPFS pinning service.
 * @param {File} file the blob file
 */
export async function pinFileToIPFS(file: File) {
    // The HTTP upload endpoint of the Storj IPFS pinning service
    const url = `https://demo.storj-ipfs.com/api/v0/add`;
    // Create a form with the file to upload
    let data = new FormData();

    data.append('file', file);

    // Execute the Upload request to the Storj IPFS pinning service
    let response = await axios.post(url,
        data,
        {
            headers: {
                // @ts-ignore
                'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            },
            // These arguments remove any client-side upload size restrictions
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        },
    );
    return response;
}