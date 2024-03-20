import styles from './UserList.module.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useUserApi } from "../hooks/useUserApi";
import { Error } from "../shared/Error/Error";

export const UserList = () => {
    const { users, isLoading, isError, error } = useUserApi();
    let navigate = useNavigate();

    if (isLoading) {
        return <div>Loading..</div>;
    }

    if (isError) {
        return <Error message={error} />
    }

    if (users.length === 0) {
        return <div>No results found.</div>
    }


    return (
        <div>
            <h1>User List</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}
                            onClick={() => { navigate(`/users/${user.id}`, { state: { user } }); }}
                        >
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Outlet context={{ userList: users }} />
        </div>
    )
};