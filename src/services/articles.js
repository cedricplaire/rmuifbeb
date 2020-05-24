import firebase, { analytics, auth, firestore, storage } from "../firebase";

import moment from "moment";

const articlesUtil = {};

articlesUtil.listAll = () => {
	return new Promise((resolve, reject) => {
		const currentUser = auth.currentUser;

		if (!currentUser) {
			reject();

			return;
		}

		const uid = currentUser.uid;

		if (!uid) {
			reject();

			return;
		}

		const articlesRef = firestore.collection("articles");

		articlesRef
			.get()
			.then((value) => {
				resolve(value);
			})
			/* .then((querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => doc.data());
				console.log(data); // array of cities objects
				resolve(data);
			}) */
			.catch((reason) => {
				reject(reason);
			});
	});
};

articlesUtil.getOne = (articleId) => {
	return new Promise((resolve, reject) => {
		const currentUser = auth.currentUser;

		if (!currentUser) {
			reject();

			return;
		}

		const uid = currentUser.uid;

		if (!uid) {
			reject();

			return;
		}

		const articlesRef = firestore.collection("articles").doc(articleId);

		articlesRef
			.get()
			.then((value) => {
				resolve(value);
			})
			.catch((reason) => {
				reject(reason);
			});
	});
};

export default articlesUtil;
