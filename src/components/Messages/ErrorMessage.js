import { Alert } from 'antd'

export default function ErrorMessage(message, type) {
  return <Alert message={message} className="message" type={type} banner="true" showIcon />
}
