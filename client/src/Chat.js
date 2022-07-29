import React, { useEffect, useState } from 'react'
import moment from 'moment';  //moment().format('MMMM Do YYYY, h:mm:ss a');

function Chat({socket, name, room}) {

    const [msg, setMsg] = useState("");
    const sendMsg = async () => {
        if(msg !== "" ){
            const msgData={
                room:room,
                author:name,
                message:msg,
                time:moment().format('MMMM Do, h:mm a')
            }

            await socket.emit("send_message", msgData)
          }
    }

    useEffect(() =>{
        socket.on("receive_msg", (data) =>{
            console.log(data)
        })
    }, [socket])
  return (
    <div className='chat-window'>chat
        <div className="chat-header">
            <h3>Chat</h3>
        </div>
        <div className="chat-body">

        </div>
        <div className="chat-footer">
            <input 
                type = "text"
                onChange={(e) => {
                    setMsg(e.target.value)
                }}
            />
            <button onClick={sendMsg}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat