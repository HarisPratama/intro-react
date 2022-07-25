import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { secondInstances } from "../../axios";
import Cms from "../cms";
import './styles.css';

const News = () => {
	const dispatch = useDispatch();

	const news = useSelector(state => state.news.news);

	const [form, setForm] = useState({
		title: '',
		desc: '',
		category: '',
		images: null,
	});

	const [showFrom, setShowForm] = useState(false);

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		try {
			const getData = await secondInstances.get('news');
			if (getData.data.data) {
				dispatch({
					type: 'SET_NEWS',
					payload: getData.data.data,
				});
			}

		} catch (error) {
			console.log(error, '<<< error');
		}
	};

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.files) {
			setForm({ ...form, images: e.target.files });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();

			Object.keys(form).map(key => {
				formData.append(key, form[key]);
			});

			const sendData = await secondInstances.post('news', formData);


			if (sendData.status == 200) {
				fetchNews();
			}

		} catch (error) {
			console.log(error);
		}
	};

	const deleteNews = async (id) => {
		try {
			const sendData = await secondInstances.delete(`news/${ id }`);

			if (sendData.status == 200) {
				fetchNews();
			}

		} catch (error) {
			console.log(error);
		}
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
				<div style={ { display: 'flex', justifyContent: 'center' } }>
					<form onSubmit={ onSubmit }>
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

						<input type="submit" value="Tambah News" />
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
							<button
								onClick={ () => deleteNews(data._id) }
							>Delete</button>
						</td>
					</tr>
				) }

			</table>
		</Cms>
	);
};

export default News;
