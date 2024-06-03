import { useState, useEffect } from "react";

export function useTaskTitle(){
  const [title, setTitle] = useState('');

  const refreshTitle = (newTitle) => {
    setTitle(newTitle);
  }

  useEffect(() => {
    if(!title) return
    if(title.length < 3) return

  } ,[title]);

  return { title, refreshTitle }
}
