
const apiRequest = async (url='',options=null,errMsg="error has occured") => {
    try{
        const response = await fetch(url,options)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        const data = await response.json()
        return data

    } catch(err){
        console.log(err || errMsg)
    } 
}

export default apiRequest;