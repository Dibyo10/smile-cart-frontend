import { useEffect, useRef, useState, memo } from "react";

import classNames from "classnames";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const { slug } = useParams();
  const timeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);

  const imageUrls = append(imageUrl, partialImageUrls);

  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    resetTimer();
  };

  useEffect(() => {
    timeRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timeRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrev}
      />
      <img
        alt={title}
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={() => {
          handleNext();
          resetTimer();
        }}
      />
      <div className="flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Carousel);
