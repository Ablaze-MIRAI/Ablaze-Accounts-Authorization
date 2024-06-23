export const AuthNav = () =>{
  return (
    <ul className="space-y-1">
      <li className="flex items-center space-x-3">
        <i className="ri-alert-fill text-3xl text-yellow-400"></i>
        <p>信頼できるダウンロード先かを確認してください</p>
      </li>
      <li className="flex items-center space-x-3">
        <i className="ri-verified-badge-fill text-3xl text-sky-400"></i>
        <p>Ablazeによる開発</p>
      </li>
      <li className="flex items-center space-x-3">
        <i className="ri-information-fill text-3xl text-green-400"></i>
        <p>このアプリと接続し情報を連携します</p>
      </li>
    </ul>
  )
}
