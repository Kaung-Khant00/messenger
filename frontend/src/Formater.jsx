import moment from "moment"
function formatter(sender,user,message){
    return {
        sender,
        user,
        message,
        time:moment().format("h:mm a")
    }
}
export default formatter