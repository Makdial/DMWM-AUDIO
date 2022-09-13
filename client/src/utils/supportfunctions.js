import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Gamou", value: "gamou" },
  { id: 3, name: "Universite du ramadan", value: "UR" },
  { id: 4, name: "Eveil", value: "eveil" },
  { id: 5, name: "Music Orientale", value: "mo" },
];

export const filterByLanguage = [
  { id: 1, name: "Wolof", value: "wolof" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Francais", value: "francais" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
