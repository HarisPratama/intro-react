import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { secondInstances } from "../../../axios";
import Cms from "../../cms";

const EditNews = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const detailNews = useSelector(state => state.news.detailNews);

	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [renderLoading, setRenderLoading] = useState(false);

	const [form, setForm] = useState({
		title: '',
		desc: '',
		category: '',
		images: null,
	});

	useEffect(() => {
		if (id) {
			fetchDetailNews();
		}
	}, []);

	useEffect(() => {
		setForm(detailNews);
	}, [detailNews]);

	const fetchDetailNews = async () => {
		setRenderLoading(true);
		try {
			const getDetailNews = await secondInstances.get(`news/${ id }`);
			if (getDetailNews.data?.status == 200) {
				dispatch({
					type: 'SET_DETAIL_NEWS',
					payload: getDetailNews.data.data
				});
				setRenderLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// const formData = new FormData();

			// Object.keys(form).map(key => {
			// 	formData.append(key, form[key]);
			// });

			const sendData = await secondInstances.put(`news/${ id }`, form);

			console.log(sendData, '<<< sendData');

			if (sendData.status == 200) {
				navigate('/news');
			}

		} catch (error) {
			console.log(error);
		}

		setLoading(false);
	};

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.files) {
			setForm({ ...form, images: e.target.files[0] });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	return (
		<Cms>
			<div>
				{ renderLoading ?
					<div>
						Loading...
					</div>
					:
					<form
						onSubmit={ onSubmit }
						style={ {
							background: '#ffff',
							padding: '20px'
						} }
					>
						<label htmlFor="">Title</label>
						<br />
						<input
							type="text"
							name="title"
							value={ form.title }
							onChange={ onChange }
						/><br /><br />

						<label htmlFor="">Description</label>
						<br />
						<input
							type="text"
							name="desc"
							value={ form.desc }
							onChange={ onChange }
						/><br /><br />

						<label htmlFor="">Category</label>
						<br />
						<input
							type="text"
							name="category"
							value={ form.category }
							onChange={ onChange }
						/><br /><br />

						<label htmlFor="">Image</label>
						<br />
						<img src={ form.images } alt="" width={ '200px' } />
						<br />
						<input type="file" name="images" onChange={ onChange } /><br /><br />

						{ loading
							?
							<div>
								Loading...
							</div>
							:
							<input type="submit" value="Update News" />
						}
					</form>

				}
			</div>
		</Cms>
	);
};

export default EditNews;
