import './App.css';
import { useState, useEffect } from 'react';
import { User } from './config.jsx';

function App() {
  const [searchtext, setSearchtext] = useState("");
  const [filterUser, setfilteredUser] = useState(User);
  const [filtercity, setfiltercity] = useState("");
  const [filterage, setfilterage] = useState("");
  const [sortOrder, setsortOrder] = useState("asc");

  useEffect(() => {
    if (!searchtext) {
      setfilteredUser(User);
      return;
    }

    const searchResult = User.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchtext.toLowerCase()) ||
        user.city.toLowerCase().includes(searchtext.toLowerCase()) ||
        user.age.toString().includes(searchtext)
      );
    });

    setfilteredUser(searchResult);
  }, [searchtext]);

  useEffect(() => {
    if (!filtercity && !filterage) {
      setfilteredUser(User);
      return;
    }

    const filterResult = User.filter((user) => {
      return (
        (filtercity && user.city === filtercity) ||
        (filterage && user.age === parseInt(filterage))
      );
    });

    setfilteredUser(filterResult);
  }, [filtercity, filterage]);

  useEffect(() => {
    const sortedUser = [...filterUser].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setfilteredUser(sortedUser);
  }, [sortOrder, filterUser]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-5xl text-center text-blue-300 font-bold py-6">Search, Sort and Filter</h1>
      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Search'
          value={searchtext}
          onChange={(e) => setSearchtext(e.target.value.toLowerCase())}
          className='w-2/3 p-2 my-8 border-2 border-gray-300 focus:outline-none rounded-lg'
        />
      </div>
      {searchtext ? 
      <p>
        {filterUser.length === 0 ? "Oops! No result found" : `Search-User: ${filterUser.length}`}
      </p> : null}
     
      <div className='flex justify-center'>
        <div>
          <span>Filter By City</span>
          <select value={filtercity} onChange={(e) => setfiltercity(e.target.value)}>
            <option value="">All</option>
            { 
              User.map((user) => {
                return (
                  <option key={user.city} value={user.city}>
                    {user.city}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div>
          <span>Filter By Age</span>
          <select value={filterage} onChange={(e) => setfilterage(e.target.value)}>
            <option value="">All</option>
            { 
              User.map((user) => {
                return (
                  <option key={user.age} value={user.age}>
                    {user.age}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div>
          <span>Sort By Name</span>
          <select value={sortOrder} onChange={(e) => setsortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>
        </div>
      </div>
    
      <div className='flex flex-wrap justify-around'>
        {filterUser.map((userData) => {
          const { name, city, age, avatar } = userData;

          return (
            <div className='bg-white p-4 m-4 rounded-lg shadow-lg w-[400px] flex items-center' key={name}>
              <img src={avatar} className='h-14 rounded-full mr-3' alt={name} />
              <div>
                <h1 className='font-bold border-b pb-2'>{name}</h1>
                <p>City: {city}</p>
                <p>Age: {age}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;