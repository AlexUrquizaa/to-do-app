import { useState, useEffect, useRef } from "react";

export function useTaskTitle(){
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  let isFirstInput = useRef(true);

  const refreshTitle = (newTitle) => {
    setTitle(newTitle);
  }

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = title === '';
      return
    }

    if(title.startsWith(' ')){
      setError('El titulo no puede empezar con un espacio vacio');
      return
    }

    if(title.length <= 3){
      setError('El titulo tiene menos de 3 caracteres!');
      return
    }

    const isNumber = title.split('').some(char => '0123456789'.includes(char));
    if(isNumber){
      setError('El titulo no puede contener numeros');
      return
    }

    setError(null);
  }, [title]);

  return { title, refreshTitle, error};
}