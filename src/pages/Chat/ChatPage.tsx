import React, {createRef, useEffect, useRef, useState} from "react"
import {ChatMessageAPIType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {getMessage, getStatus} from "../../selectors/chat-selectors";

// компонента для отрисовки чата
const ChatPage: React.FC = (props) => {
    // отрисовка компоненты
    return <div>
        <Chat/>
    </div>
}

// компонента для отрисовки страницы чата
const Chat: React.FC = (props) => {

    // переменная для диспатча
    const dispatch = useDispatch()
    // получение статуса из хранилища
    const status = useSelector(getStatus)
    // функция для прослушивания
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    // отрисовка компоненты
    return <div>
        {status === 'error' && <div>Some error has occurred. Please refresh the page.</div>}
        <Messages/>
        <AddMessageForm/>
    </div>
}
// компонента для отображения сообщений
const Messages: React.FC = () => {
    // получения сообщений из стейта
    const messages = useSelector(getMessage)
    // создание ссылки для прокрутки
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    // локальное хранилище для определения прокрутки
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    // функция прокрутки
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (element.scrollHeight - element.scrollTop < element.clientHeight + element.clientHeight * 0.05) {
            setIsAutoScroll(true)
        } else {
            setIsAutoScroll(false)
        }
    }
    // фукнция для определения автоматической прокрутки сообщений
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    // отрисовка компоненты
    return <div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.length === 0 && <div>No messages</div>}
        {messages.map((m) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}/>
    </div>
}

// компонента для отрисовки сообщения
const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    //  отрисовка компоненты
    return <div>
        <div>
            <img src={message.photo} alt="" style={{width: "75px"}}/> <b>{message.userName}</b>
        </div>
        <div>
            {message.message}
        </div>
        <hr/>
    </div>
})

// компонента для отрисовки формы для отправки сообщений
const AddMessageForm: React.FC = () => {

    // локальное хранилище для сообщений
    const [message, setMessage] = useState('')
    // переменная для диспатча
    const dispatch = useDispatch()
    // получение статуса из хранилища
    const status = useSelector(getStatus)

    // функция отправки сообщения
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    // отрисовка компоненты
    return <div>
        <br/>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}
export default ChatPage