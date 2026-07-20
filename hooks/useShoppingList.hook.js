import { useState, useEffect } from "react";
import { getStorage, setStorage } from "../utils/storage";
import { APP_KEYS } from "@/utils/key";
import * as Hapitics from "expo-haptics";

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    getShoppingList();
  }, []);

  const sortShoppingList = (list) => {
    const sorted = list.sort((a, b) => {
      // First, handle completion status
      if (a.isCompleted && !b.isCompleted) {
        return 1; // Completed items go to bottom
      } else if (!a.isCompleted && b.isCompleted) {
        return -1; // Incomplete items go to top
      } else {
        // Both items have same completion status
        // For completed items: sort by lastupdatedAt (most recent last)
        // For incomplete items: sort by lastupdatedAt (most recent first)
        const dateA = a.lastupdatedAt ? new Date(a.lastupdatedAt) : new Date(0);
        const dateB = b.lastupdatedAt ? new Date(b.lastupdatedAt) : new Date(0);

        if (a.isCompleted) {
          // Completed: newest goes to bottom (ascending order)
          return dateA.getTime() - dateB.getTime();
        } else {
          // Incomplete: newest goes to top (descending order)
          return dateB.getTime() - dateA.getTime();
        }
      }
    });
    setShoppingList(sorted);
  };

  const getShoppingList = async () => {
    try{
      const data = await getStorage(APP_KEYS.SHOPPING_LIST_KEY);
      console.log(data);
      if (data) {
        sortShoppingList(data);
      } else {
        setShoppingList([]);
      }
    } catch{}
  };

  const createShoppingList = async (newList) => {
    const newListItem = {
      id: shoppingList.length !== 0 ? shoppingList.length + 1 : 1,
      name: newList,
      isCompleted: false,
      createdAt: Date.now(),
      lastupdatedAt: null,
    };

    const updatedList = [newListItem, ...shoppingList];
    await setStorage(APP_KEYS.SHOPPING_LIST_KEY, updatedList);
    getShoppingList();
  };


  const deleteShoppingList = async (listId) => {
    const filteredList = shoppingList.filter((item) => item.id !== listId);
    Hapitics.notificationAsync(Hapitics.NotificationFeedbackType.Success);
    await setStorage(APP_KEYS.SHOPPING_LIST_KEY, filteredList);
    getShoppingList();
  };

  const updateShoppingList = async (listId) => {
    const updatedList = shoppingList.map((item) => {
      if (item.id === listId) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
          lastupdatedAt: new Date(),
        };
      }
      return item;
    });
    Hapitics.impactAsync(Hapitics.ImpactFeedbackStyle.Heavy);
    await setStorage(APP_KEYS.SHOPPING_LIST_KEY, updatedList);
    getShoppingList();
  };

  return {
    shoppingList,
    getShoppingList,
    createShoppingList,
    deleteShoppingList,
    updateShoppingList,
  };
};


  // const handleSubmit = (data) => {
  //   console.log("Adding:", data);
  //   setShoppingList([
  //     {
  //       id: shoppingList.length !== 0 ? shoppingList.length + 1 : 1,
  //       name: data,
  //       isCompleted: false,
  //       createdAt: new Date(),
  //       lastUpdatedAt: new Date(),
  //     },
  //     ...shoppingList,
  //   ]);
  // };

  // const handleDelete = (id) => {
  //   console.log("Deleting item with id:", id);
  //   setShoppingList(shoppingList.filter((item) => item.id !== id));
  // };

  // const handleCompleteToggle = (id) => {
  //   const updatedList = shoppingList.map((listItem) => {
  //     console.log(listItem);
  //     if (listItem.id === id) {
  //       return {
  //         ...listItem,
  //         isCompleted: !listItem.isCompleted,
  //         lastUpdatedAt: new Date(),
  //       };
  //     }
  //     return listItem;
  //   });
  //   sortingTasks(updatedList);
  //   // setShoppingList(updatedList);
  // };