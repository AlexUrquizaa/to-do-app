import { useState, useEffect, useRef } from "react";

export function useTaskTitle(){
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  let isFirstInput = useRef(true);

  const refreshTitle = (newTitle) => {
    setTitle(newTitle);
  }

  const validateTitleSubmit = (newTitle) => {
    if(error) return true;

    if(newTitle === ''){
      setError('No enviaste ningun titulo');
      return true;
    }

    if(newTitle.trim().length <= 3){
      setError('El titulo tiene menos de 3 caracteres!');
      return true;
    }

    setError(null);
  }

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = !(title === ''); //Cambiar luego sacando el !.
      return
    }

    if(title.startsWith(' ')){
      setError('El titulo no puede empezar con un espacio vacio');
      return
    }

    const isNumber = title.split('').some(char => '0123456789'.includes(char));
    if(isNumber){
      setError('El titulo no puede contener numeros');
      return
    }

    setError(null);
  }, [title]);

  return { title, refreshTitle, error, validateTitleSubmit};
}

