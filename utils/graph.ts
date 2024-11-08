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

    console.log('request made to Graph API at: ');

    return fetch(endpoint, options)
        .then((response:any) => response.json())
        .catch((error:any) => console.log("callMSGraph: ERROR", error));
}
