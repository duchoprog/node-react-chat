import React, { useEffect, useState } from 'react'
import moment from 'moment'; 
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket, name, room}) {

    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([])

    const sendMsg = async () => {
        if(msg !== "" ){
            const msgData={
                room:room,
                author:name,
                message:msg,
                time:moment().format(' h:mm a')
            }

            await socket.emit("send_message", msgData);
            setMsgList( [...msgList, msgData]);
            setMsg('');
          }
    }

    useEffect(() =>{
        socket.on("receive_msg", (data) =>{
            setMsgList( [...msgList, data])
        })
    }, [socket]);
  return (
    <div className='chat-window'>chat
        <div className="chat-header">
            <p>Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>
            {msgList.map((msg) =>{
            return <div className={name===msg.author? "message you": "message other"}>
                    <div>
                        <div className='message-content'><p>{msg.message}</p></div>
                        <div className='message-data'>
                            <p className='author'>{msg.author}</p>
                            <p>{msg.time}</p>
                        </div>
                    </div>
                </div>
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input 
                type = "text"
                value={msg}
                onChange={(e) => {
                    setMsg(e.target.value)
                }}

                onKeyPress = {(e) => {e.key === "Enter" && sendMsg()}}
            />
            <button onClick={sendMsg}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat