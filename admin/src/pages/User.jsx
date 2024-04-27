import React, { useState } from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/tour.css'
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { BASE_URL } from '../ultis/config'
import useFetch from '../hooks/useFetch'
import "./../styles/user.css"

const User = () => {

    const { data: users, loading, error } = useFetch(`${BASE_URL}/users`)

    const accessToken = localStorage.getItem('accessToken');
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ username: '', email: '' });

    const handleUpdate = () => {
        fetch(`${BASE_URL}/users/${selectedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => {
                alert("cap nhat thanh cong")

                window.location.reload();
                // Cập nhật lại danh sách người dùng sau khi cập nhật thành công
            })
            .catch((error) => {
                alert("cap nhat that bai")

                window.location.reload();
            });

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({ username: user.username, email: user.email });
    };
    // ============================
    // delete user 
    const handleDelete = (id) => {
        fetch(`${BASE_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                res.json()
                alert("Deleted Successfully");
                window.location.reload();
            })
            .then((data) => {
                if (data.deletedCount > 0) {
                    fetch(`${BASE_URL}/users/${id}`)
                        .then((res) => res.json())
                        .then((updatedUsers) => {
                            const remaining = updatedUsers.filter((user) => user._id !== id);
                            console.log(remaining);
                        });
                }
            })
            ;
    };
    return (
        <>
            <CommonSection title={"All User"} />
            <section>
                <Container>
                    <Row>

                    </Row>
                </Container>
            </section>
            <section className='pt-0'>
                <Container>
                    {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
                    {error && <h4 className='text-center pt-5'>{"Bạn không có quyền truy cập"}</h4>}
                    {
                        !loading && !error &&
                        <Row>
                            {users.map((user) => (
                                <div className="user-item" key={user._id}>
                                    <p className="user-info">
                                        <span>Username:</span> {user.username}
                                    </p>
                                    <p className="user-info">
                                        <span>Email:</span> {user.email}
                                    </p>
                                    <p className="user-info">
                                        <span>Role:</span> {user.role}
                                    </p>
                                    <div className="user-actions">
                                        <button className="update-btn" onClick={() => handleEdit(user)}>Update</button>
                                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </Row>
                    }
                    {/* update  */}
                    {selectedUser && (
                        <Row>
                            <Col>
                                <h4>Edit User</h4>
                                <Form>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <div className="user-actions">
                                        <Button color="primary" onClick={handleUpdate}>Update</Button>
                                        <Button color="danger" onClick={() => setSelectedUser(null)}>Cancel</Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
        </>
    )
}

export default User