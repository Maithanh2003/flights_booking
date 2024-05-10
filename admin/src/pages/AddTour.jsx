import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../ultis/config';
const AddTour = () => {
    const accessToken = localStorage.getItem('accessToken')
    const [formData, setFormData] = useState({
        photo: '',
        title: '',
        desc: '',
        price: '',
        address: '',
        reviews: [],
        city: '',
        distance: '',
        maxGroupSize: ''
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(formData)
        try {
            // Thực hiện gửi dữ liệu form đã thêm lên server để cập nhật thông tin tour
            const res = await fetch(`${BASE_URL}/tours/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                alert('Failed to add tour');
                navigate(`/tours/`);
            }
            navigate(`/tours/`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Thêm mới Tour</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ảnh:</label>
                    <input type="text" className="form-control" name="photo" value={formData.photo} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Tiêu đề:</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea className="form-control" name="desc" value={formData.desc} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Giá:</label>
                    <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Thành phố:</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Độ cao:</label>
                    <input type="text" className="form-control" name="distance" value={formData.distance} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Số lượng:</label>
                    <input type="text" className="form-control" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} required />
                </div>
                <div className="add-tour-container ml-auto mt-4">
                    <div className="user-actions">
                        <button type="submit" className="btn btn-primary">Thêm mới </button>
                        <Link to={`/tours/`} className="btn btn-primary">Cancel </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTour;