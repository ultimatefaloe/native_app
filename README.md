# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



# Asyn Storage Utils
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskItems } from "../app";

export const saveTasksToLocalStorage = async (key: string, tasks: TaskItems[]) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    await AsyncStorage.setItem(key, serializedTasks);
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}

export const loadTasksFromLocalStorage = async (key: string): Promise<TaskItems[]> => {
  try {
    const serializedTasks = await AsyncStorage.getItem(key);
    if (serializedTasks === null) {
      return [];
    }
    return JSON.parse(serializedTasks);
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
}


## UPdate storage Hooks
import { useEffect, useState } from "react";
import { TaskItems } from "../app";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/storage";
import { LayoutAnimation } from "react-native";
import * as Haptics from "expo-haptics";

const storageKey = "tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItems[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const sortingTasks = (tasks: TaskItems[]) => {
    return tasks.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) {
        return 1;
      } else if (!a.isCompleted && b.isCompleted) {
        return -1;
      } else {
        const dateA = a.lastupdatedAt ? new Date(a.lastupdatedAt) : new Date(0);
        const dateB = b.lastupdatedAt ? new Date(b.lastupdatedAt) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      }
    });
  };

  const getTasks = async () => {
    try {
      setIsLoading(true);

      const loadedTasks = await loadTasksFromLocalStorage(storageKey);

      const sortedTasks = sortingTasks(loadedTasks);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error getting tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (value: string) => {
    if (value.trim() === "") return;

    const newTask: TaskItems = {
      id: Date.now().toString(),
      title: value,
      isCompleted: false,
      completedAt: undefined,
      lastupdatedAt: new Date(),
    };

    const updatedTasks = [newTask, ...tasks];

    await saveTasksToLocalStorage(storageKey, updatedTasks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(sortingTasks(updatedTasks));
  };

  const handleDeleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    await saveTasksToLocalStorage(storageKey, updatedTasks);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(sortingTasks(updatedTasks));
  };

  const handleOnCompleted = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? (task.isCompleted
            ? Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              )
            : Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning,
              ),
          {
            ...task,
            isCompleted: !task.isCompleted,
            completedAt: !task.isCompleted ? new Date() : undefined,
            lastupdatedAt: new Date(),
          })
        : task,
    );

    await saveTasksToLocalStorage(storageKey, updatedTasks);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(sortingTasks(updatedTasks));
  };

  return {
    tasks,
    handleSubmit,
    handleDeleteTask,
    handleOnCompleted,
    isLoading,
  };
};
