import { auth, firestore } from "../firebase";

//import moment from "moment";

const articlesUtil = {};

articlesUtil.listCateg = () => {
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

    const categRef = firestore.collection("categories");

    categRef
      .get()
      .then((value) => {
        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

articlesUtil.addCateg = (name) => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser || !name) {
      reject();

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject();

      return;
    }

    const categRef = firestore
      .collection("categories")
      .where("name", "==", name);

    categRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          reject("Categorie already exist !");
        } else {
          console.log("No such document! adding new category");
          categRef
            .add(name)
            .then((categ) => {
              resolve(categ);
            })
            .catch((reason) => {
              reject(reason);
            });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  });
};

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
