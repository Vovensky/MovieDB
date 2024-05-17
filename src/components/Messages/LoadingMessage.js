import './LoadingMessage.scss'
import { Spin } from 'antd'

export default function LoadingMessage() {
  return (
    <div className="message">
      <div className="message__spinner-container">
        <Spin size="large" />
      </div>
      <div className="message__text message__text--distanced">
        <span> Получаем ответ сервера...</span>
      </div>
    </div>
  )
}
