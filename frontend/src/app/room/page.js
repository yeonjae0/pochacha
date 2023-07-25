import RoomCam from '../../routes/RoomCam.js'
import RoomChat from '../../routes/RoomChat.js'
import RoomBtn from '../../routes/RoomBtn.js'

export default function Room() {
  return (
    <div>
      <h1>룸 화면</h1>
      <RoomCam />
      <RoomChat />
      <RoomBtn />
    </div>
  )
}
