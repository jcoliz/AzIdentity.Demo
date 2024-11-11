/** 
 * Helper function to call MS Graph API endpoint
 * using the authorization bearer token scheme
*/
export async function callMSGraph(endpoint:string, token:string): Promise<any> {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(endpoint, options)
        .then((response:any) => response.json())
        .catch((error:any) => console.log("callMSGraph: ERROR", error));
}

// https://stackoverflow.com/questions/18650168/convert-blob-to-base64
const blobToBase64 = (blob:Blob):Promise<string> => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
        resolve(reader.result as string);
        };
    });
    };

export async function callMSGraphImage(endpoint:string, token:string): Promise<string|undefined> {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(endpoint, options)
        .then(async (response:any) => {
            console.log("callMSGraphImage: OK", response.status)
            const blob = await response.blob()
            return await blobToBase64(blob) 
        })
        .catch((error:any) => {
            console.log("callMSGraphImage: ERROR", error)
            return undefined;
        });
}
