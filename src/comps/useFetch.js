import { useState, useEffect } from "react";

const useFetch = callback => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function isScrolling() {
    console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight)
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    console.log("scroll botom")
    setIsFetching(true);
  }
  return [isFetching, setIsFetching];
};

export default useFetch;
