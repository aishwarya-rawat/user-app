import { Link, useLocation } from "react-router-dom";

const UserDetails = () => {
    const { user } = useLocation().state;
    return (
        <div>
            <aside> <Link to="/users">Back to user list</Link></aside>
            <h1>User Details</h1>
            {user ? <>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Address: {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Company: {user.company?.name}, {user.company?.catchPhrase}, {user.company?.bs}</p>
            </> : <p>No user found</p>}

        </div>
    )


}

export default UserDetails;