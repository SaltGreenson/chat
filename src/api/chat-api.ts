// переменная типа WebSocket
let ws: WebSocket | null = null
// объект содержащий в себе массивы сообщений и статусов
const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
} as SubscribesType

// функция закрытия канала
const closeHandler = () => {
    // установка статуса
    notifySubscribersAboutStatus('pending')
    // установка таймаута
    setTimeout(createChannel, 3000)
};

// функция получения сообщений
const messageHandler = (event: MessageEvent) => {
    // преобразование сообщений в json файл
    const newMessages = JSON.parse(event.data)
    // запись всех сообщений
    subscribers["messages-received"].forEach(s => s(newMessages))
};

// функция открытия канала прослушки сообщений
const openHandler = () => {notifySubscribersAboutStatus('ready')}

// функция установки статуса при возникновении ошибки
const errorHandler = () => {
    // установка стауса
    notifySubscribersAboutStatus('error')
    // вывод ошибки на консоль
    console.error("REFRESH THE PAGE")
}

// функция закрытия всех eventListener
const cleanUp = () => {
    // очистка события ЗАКРЫТЬ
    ws?.removeEventListener('close', closeHandler)
    // очистка события СООБЩШЕНИЕ
    ws?.removeEventListener('message', messageHandler)
    // очистка события ОТКРЫТИЕ
    ws?.removeEventListener('open', openHandler)
    // очистка события ОШИБКА
    ws?.removeEventListener('error', errorHandler)
}

// функция установки статуса
const notifySubscribersAboutStatus = (status: StatusType) => {
    // установак всех статусов
    subscribers['status-changed'].forEach(s => s(status))
}

// функция создания канала
function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

// объект содержащий в себе функции для получения обработки сообщений
export const chatAPI = {
    // функция для создания канала
    start() {
        createChannel()
    },
    // функция для остановки прослушивания канала
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        ws?.close()
        cleanUp()
    },
    // функция подписки
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        // first version
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    // функция для отписки
    // second version
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers.filter(s => s !== callback)
        }
    },
    // функция отправки сообщений
    sendMessage(message: string) {
        if (!message) return
        ws?.send(message)
    }
}

// тип для названий типов массива
type EventsNamesType = 'messages-received' | 'status-changed'

// тип для получения сообщений
export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
// тип для массива
type SubscribesType = {
    'messages-received': MessagesReceivedSubscriberType[],
    'status-changed': StatusChangedSubscriberType[]
}
// тип
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
// тип
type StatusChangedSubscriberType = (status: StatusType) => void
// тип для статуса
export type StatusType = 'pending' | 'ready' | 'error'