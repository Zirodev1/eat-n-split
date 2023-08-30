const initialFrends = [
  {
    id: 118836,
    name: "Clark",
    image: "http://i.pravatar.cc/48?u=118836",
    balance: -7
  },
  {
    id: 933372,
    name: "Sarah",
    image: "http://i.pravatar.cc/48?u=933372",
    balance: 20
  },
  {
    id: 499476,
    name: "Anthony",
    image: "http://i.pravatar.cc/48?u=499476",
    balance: 0
  },
]

export default function App(){
  return <div className="app">
    <div className="sidebar">
      <FriendsList/>
    </div>
  </div>
}

function FriendsList() {
  const friends = initialFrends;

  return <ul>
    {friends.map(friend => <li>{friend.name}</li> )}
  </ul>
}