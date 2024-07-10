import { openDB } from "idb";

const DB_NAME = 'ColorPicker';
const HISTORY_TABLE = 'History';
const COLORS_TABLE = 'ColorPalletes';

const initDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(HISTORY_TABLE)) {
          db.createObjectStore(HISTORY_TABLE, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(COLORS_TABLE)) {
          db.createObjectStore(COLORS_TABLE, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  };
  
  export const addColorP = async (task) => {
    const db = await initDB();
    return db.add(COLORS_TABLE, task);
  };
  
  export const getColorP = async () => {
    const db = await initDB();
    return db.getAll(COLORS_TABLE);
  };
  
  export const deleteColorP = async (id) => {
    const db = await initDB();
    return db.delete(COLORS_TABLE, id);
  };
  
  export const updateColors = async (color) => {
    const db = await initDB();
    return db.put(COLORS_TABLE, color);
  };
  {/*=================================================*/}
  
  export const addColor = async (color) => {
    const db = await initDB();
    return db.add(HISTORY_TABLE, { color });
  };
  
  export const getHistory = async () => {
    const db = await initDB();
    return db.getAll(HISTORY_TABLE);
  };
  
  export const deleteName = async (id) => {
    const db = await initDB();
    return db.delete(HISTORY_TABLE, id);
  };

  export const deleteHistoy = async () => {
    const db = await initDB();
    return db.clear(HISTORY_TABLE);
  };
  