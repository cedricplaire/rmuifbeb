import { auth, firestore } from "../firebase";

//import moment from "moment";

const articlesUtil = {};

articlesUtil.listCateg = () => {
  return new Promise((resolve, reject) => {

    const categRef = firestore.collection("categories");

    categRef
      .get()
      .then((querySnapshot) => {
        const categ = [];
        querySnapshot.forEach((doc) => {
          const { name } = doc.data();

          categ.push({
            key: doc.id,
            name,
          });
        });
        resolve(categ);
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

    const articlesRef = firestore.collection("articles").orderBy("createdAt", "desc");

    articlesRef
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const {
            title,
            author,
            authorId,
            createdAt,
            content,
            category,
          } = doc.data();

          posts.push({
            key: doc.id,
            title,
            author,
            authorId,
            createdAt,
            content,
            category,
          });
        });
        resolve(posts);
      })
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
