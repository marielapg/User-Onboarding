import React from "react";

const UsersInfo = props => {
    console.log(props)
    return (
        <div>
            {props.user.map((user, index) => (
                <ul key={index}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    )
}
export default UsersInfo;