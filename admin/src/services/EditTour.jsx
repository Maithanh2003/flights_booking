import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../ultis/config';
import useFetch from '../hooks/useFetch';
const EditTour = () => {
    const { id } = useParams();
    const { data: tourData, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
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
    useEffect(() => {
        if (!loading && !error && tourData) {
            const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tourData;
            setFormData({ photo, title, desc, price, address, reviews, city, distance, maxGroupSize });
        }
    }, [loading, error, tourData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(formData)
        try {
            // Thực hiện gửi dữ liệu form đã chỉnh sửa lên server để cập nhật thông tin tour
            const res = await fetch(`${BASE_URL}/tours/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                alert('Failed to update tour');
                navigate(`/tours/${id}`);
            }
            navigate(`/tours/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Chỉnh sửa Tour</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ảnh:</label>
                    <input type="text" className="form-control" name="photo" value={formData.photo} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Tiêu đề:</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea className="form-control" name="desc" value={formData.desc} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Giá:</label>
                    <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Thành phố:</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Độ cao:</label>
                    <input type="text" className="form-control" name="distance" value={formData.distance} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Số lượng:</label>
                    <input type="text" className="form-control" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Lưu </button>
            </form>
        </div>
    );
}
export default EditTour;