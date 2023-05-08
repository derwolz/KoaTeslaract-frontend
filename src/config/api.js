const isDebug = false;
const testIP = "http://127.0.0.1:"
const deployIP="http://192.168.0.161:"
const testPort = "5000"
const deployPort = "5000"
const getIP = () =>{
    return (isDebug ? testIP+testPort : deployIP+deployPort)
}
export default getIP;