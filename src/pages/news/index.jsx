import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { secondInstances } from "../../axios";
import { fetchnews } from "../../store/reducers/news";
import Cms from "../cms";
import './styles.css';

const News = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const news = useSelector(state => state.news.news);

	const [form, setForm] = useState({
		title: '',
		desc: '',
		category: '',
		images: null,
	});

	const [showFrom, setShowForm] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(fetchnews());
	}, []);

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.files) {
			setForm({ ...form, images: e.target.files[0] });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData();

			Object.keys(form).map(key => {
				formData.append(key, form[key]);
			});

			const sendData = await secondInstances.post('news', formData);

			if (sendData.status == 200) {
				dispatch(fetchnews());
			}

		} catch (error) {
			console.log(error);
		}

		setShowForm(false);
		setLoading(false);
	};

	const deleteNews = async (id) => {
		setLoading(true);
		try {
			const sendData = await secondInstances.delete(`news/${ id }`);

			if (sendData.status == 200) {
				dispatch(fetchnews());
			}

		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const editNews = (id) => {
		navigate(`/news/${ id }`);
	};

	return (
		<Cms>

			<h1>News</h1>

			<div>
				<button onClick={
					() => setShowForm(!showFrom)
				}>Tambah</button>
			</div>

			{ showFrom &&
				<div style={ {
					position: 'fixed',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					top: 0,
					left: 0,
					background: 'rgba(0, 0, 0, 0.7)',
					width: '100%',
					height: '100%',
				} }>
					<form
						onSubmit={ onSubmit }
						style={ {
							background: '#ffff',
							padding: '20px'
						} }
					>
						<label htmlFor="">Title</label>
						<br />
						<input type="text" name="title" onChange={ onChange } /><br /><br />

						<label htmlFor="">Description</label>
						<br />
						<input type="text" name="desc" onChange={ onChange } /><br /><br />

						<label htmlFor="">Category</label>
						<br />
						<input type="text" name="category" onChange={ onChange } /><br /><br />

						<label htmlFor="">Image</label>
						<br />
						<input type="file" name="images" onChange={ onChange } /><br /><br />

						{ loading
							?
							<div>
								Loading...
							</div>
							:
							<input type="submit" value="Tambah News" />
						}
					</form>
				</div>
			}

			<table
				style={ { width: '100%', marginTop: '20px' } }
			>
				<tr>
					<th>Tile</th>
					<th>Description</th>
					<th>Image</th>
					<th>Action</th>
				</tr>

				{ news && news?.map(data =>
					<tr
						key={ data._id }
					>
						<td>{ data.title }</td>
						<td>{ data.desc }</td>
						<td>
							<img src={ data.images } height='50px' />
						</td>
						<td>
							{ loading ?
								<div>
									Loading...
								</div>
								:
								<div style={ { display: 'flex', gap: '20px' } }>
									<button
										onClick={ () => editNews(data._id) }
									>Edit</button>
									<button
										onClick={ () => deleteNews(data._id) }
									>Delete</button>
								</div>
							}
						</td>
					</tr>
				) }



			</table>
		</Cms>
	);
};

export default News;
