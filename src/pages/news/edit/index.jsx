import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import instance, { secondInstances } from "../../../axios";
import { fetchDetailNews } from "../../../store/reducers/news";
import Cms from "../../cms";

const EditNews = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const detailNews = useSelector(state => state.news.detailNews);
	const loadingNews = useSelector(state => state.news.loading);

	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [renderLoading, setRenderLoading] = useState(false);
	const [img, setImg] = useState(null);

	const [form, setForm] = useState({
		title: '',
		desc: '',
		category: '',
		images: null,
	});

	useEffect(() => {
		if (id) {
			dispatch(fetchDetailNews(id));
		}
	}, []);

	useEffect(() => {
		setForm(detailNews);
	}, [detailNews]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// const formData = new FormData();

			// Object.keys(form).map(key => {
			// 	formData.append(key, form[key]);
			// });

			const sendData = await instance.put(`/news/${ id }`, form);

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
			const [file] = e.target.files;
			setImg(URL.createObjectURL(file));
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	return (
		<Cms>
			<div>
				{ JSON.stringify(loadingNews) }

				{ loadingNews ?
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
							style={ {
								border: '1px solid red',
								color: 'red',
								fontWeight: '700',
							} }
						/><br /><br />

						<label htmlFor="">Description</label>
						<br />
						<textarea
							rows={ 12 }
							style={ { border: '1px solid yellow' } }
							type="text"
							name="desc"
							value={ form.desc }
							onChange={ onChange }
						/><br /><br />

						{/* <label htmlFor="">Category</label>
						<br />
						<input
							type="text"
							name="category"
							value={ form.category }
							onChange={ onChange }
						/><br /><br />

						<label htmlFor="">Image</label>
						<br />
						<img src={ img ?? form.images } alt="" width={ '200px' } />
						<br />
						<input type="file" name="images" onChange={ onChange } /><br /><br /> */}

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
