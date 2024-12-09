import React, { useState} from 'react'

const Search = () => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [neverSignedIn, setNeverSignedIn] = useState(false)
    const [afterUser, setAfterUser] = useState(false)
    const [sameDay, setSameDay] = useState(false)
    const [today, setToday] = useState(false)
    const [results, setResults] = useState([])
    const [message, setMessage] = useState('')

    const fetchData = async (endpoint) => {
        try {
        const response = await fetch(`http://localhost:5050/${endpoint}`)
        const data = await response.json()
        setResults(data.data || [])
        console.log("Fetched Data:", data.data)
        if (data.data && data.data.length === 0){
            setMessage("No results for Search! Try again!")
        }else{
            setMessage('')
        }
        } catch (error) {
        console.error('Error fetching data:', error)
        setMessage("Error fetching the data! Try again!")
        }
    }

    const handleClear = (e)=> {
        e.preventDefault()
        setId('')
        setName('')
        setMinSalary('')
        setMaxSalary('')
        setMinAge('')
        setMaxAge('')
        setNeverSignedIn(false)
        setSameDay(false)
        setAfterUser(false)
        setToday(false)
        setMessage('')
        setResults('')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (afterUser) {
            if (name) {
                fetchData(`searchAfterUserName/${name}`)
                console.log(`Fetching after user name: ${name}`)
            } else if (id) {
                fetchData(`searchAfterUserId/${id}`)
                console.log(`Fetching after user id: ${id}`)
            }
        } else if (sameDay) {
            if (name) {
                fetchData(`searchSameDayAsUserName/${name}`)
                console.log(`Fetching same day as user name: ${name}`)
            } else if (id) {
                fetchData(`searchSameDayAsUserId/${id}`)
                console.log(`Fetching same day as user id: ${id}`)
            }
        } else {

            if (id) {
                fetchData(`searchId/${id}`)
            } else if (name) {
                fetchData(`searchName/${name}`)
            } else if (minSalary && maxSalary) {
                fetchData(`searchSalary/${minSalary}&${maxSalary}`)
            } else if (minAge && maxAge) {
                fetchData(`searchAge/${minAge}&${maxAge}`)
            } else if (neverSignedIn) {
                fetchData(`neverSignedIn`)
            } else if (today) {
                fetchData(`searchToday`)
            } else {
                alert('Please enter search criteria')
            }
        }
    }

    return (
        <div className="container">
        <h2>Search Users</h2>
        <form onSubmit={handleSearch}>
            <div id="Search-inputs">
                <input
                id='id'
                type="number"
                placeholder="Search by Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                />
                <input
                id='name'
                type="text"
                placeholder="Search by Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                id='Min Salary'
                type="number"
                placeholder="Min Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                />
                <input
                id='Max Salary'
                type="number"
                placeholder="Max Salary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                />
                <input
                id='Min Age'
                type="number"
                placeholder="Min Age"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                />
                <input
                id='Max Age'
                type="number"
                placeholder="Max Age"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                />
            </div>
            <div>
                <input
                id='neverSignedIn'
                type="checkbox"
                checked={neverSignedIn}
                onChange={(e) => setNeverSignedIn(e.target.checked)}
                />
                <label for="neverSignedIn">Never Signed In</label>
                <input
                id="sameDay"
                type="checkbox"
                checked={sameDay}
                onChange={(e) => setSameDay(e.target.checked)}
                />
                <label for="sameDay">Same day as User</label>
                <input
                id="afterUser"
                type="checkbox"
                checked={afterUser}
                onChange={(e) => setAfterUser(e.target.checked)}
                />
                <label for="afterUser">After User</label>
                <input
                id="today"
                type="checkbox"
                checked={today}
                onChange={(e) => setToday(e.target.checked)}
                />
                <label for="today">Registered Today</label>
            </div>
            <button className="page-btn" type="submit">Search</button>
            <button className="page-btn" onClick={handleClear}>Clear</button>
        </form>

        {results.length > 0 ? (
            <table>
            <thead>
                <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Password</th>
                <th>Sign Up Time</th>
                <th>Sign In Time</th>
                <th>Updated Time</th>
                </tr>
            </thead>
            <tbody>
                {results.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.salary}</td>
                    <td>{user.password}</td>
                    <td>{new Date(user.sign_up_time).toLocaleString()}</td>
                    <td>{user.sign_in_time ? new Date(user.sign_in_time).toLocaleString() : "Not Signed in"}</td>
                    <td>{user.updated_time ? new Date(user.updated_time).toLocaleString() : "Not Updated"}</td>
                </tr>))}
            </tbody>
            </table>
        ) : (
            <div className="message-box">
                {message}
            </div>
        )}
        </div>
    )
}

export default Search;
