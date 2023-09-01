import useState from 'react';

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
  const [friends, setFriends] = useState(initialFrends)
  const [showAddFreind, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend((show) => !show)
  }

  function handleAddFriend(friend){
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend){
    // selectedFriend(friend);
    setSelectedFriend(cur => cur?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  return <div className="app">
    <div className="sidebar">
      <FriendsList 
        friends={friends}
        selectedFriend={selectedFriend}
        onSelection={handleSelection}
        />

      { showAddFreind && <FormAddFriend onAddFriend={handleAddFriend}/>}
      <Button onClick={handleShowAddFriend}>Add Friend</Button>
    </div>
    <div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}/>}
    </div>
  </div>
}

function FriendsList({ friends, onSelection, selectedFriend }) {

  return <ul>
    {friends.map(friend => 
      <Friend  
        friend={friend} 
        key={friend.id}
        onSelection={onSelection}
        selectedFriend={selectedFriend}
      /> )}
  </ul>
}

function Friend({friend, onSelection, selectedFriend}){
  const isSelected = selectedFriend?.id === friend.id

  return <li className={isSelected ? "selected" : ""}>
    <img src={friend.img} alt={friend.name}/>
    <h3>{friend.name}</h3>

    {
      friend.balance < 0 && (
        <p className='red'> You owe {friend.name} {Math.abs(friend.balance)}</p>
      )
    }
    {
      friend.balance > 0 && (
        <p className='green'> {friend.name} owes you {Math.abs(friend.balance)}</p>
      )
    }
    {
      friend.balance < 0 && (
        <p> You and {friend.name} are even.</p>
      )
    }
    <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
  </li>
}

function Button({ children, onClick }){
  return  <button className="button" onClick={onClick}>{children}</button>

}

function FormAddFriend({onAddFriend}){
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e){
    e.prventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend)

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <lable>🧑‍🤝‍🧑Friend Name</lable>
    <input 
      type="text"
      value={name}
      onChange={(e)=> setName(e.target.value)}
    />

    <lable>🖼️ Image url</lable>
    <input 
      type="text"
      value={image}
      onChange={(e) => setImage(e.target.value)}
    />

    <Button>Add</Button>
  </form>
}

function FormSplitBill({selectedFriend}){
  const [bill, setBill] = useState("");
  const [paidByUSer, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return <form className="form-split-bill">
    <h2>Split a bill with {selectedFriend.name}</h2>

    <lable>💲Bill value</lable>
    <input type="text" value={bill} onChange={(e) => setBill(e.target.value)}/>

    <lable>Your Expense</lable>
    <input type="text" value={paidByUSer} onChange={(e) => setPaidByUser(e.target.value)}/>

    <lable> {selectedFriend.name}'s Expense</lable>
    <input type="text"/>

    <lable>Who is paying the bill?</lable>
    <select
      value={whoIsPaying}
      onChange={(e) => setWhoIsPaying(e.target.value)}
    >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <Button>Split bill</Button>
  </form>
}
