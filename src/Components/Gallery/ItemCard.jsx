/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import './style.css';


const ItemCard = forwardRef(
  (
    {
      id,
      index,
      deletedImg,
      setDeletedImg,
      withOpacity,
      isDragging,
      style,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(deletedImg?.includes(id));

    useEffect(() => {
      setSelected(deletedImg?.includes(id));
    }, [deletedImg, id]);

    const handleDeletedImages = () => {
      const updatedDeletedImg = [...deletedImg];
      const isCurrentlySelected = updatedDeletedImg?.includes(id);

      if (isCurrentlySelected) {
        updatedDeletedImg?.splice(updatedDeletedImg?.indexOf(id), 1);
      } else {
        updatedDeletedImg?.push(id);
      }

      setDeletedImg(updatedDeletedImg);
      setSelected(!isCurrentlySelected);
    };

    const cardStyles = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "0% 0%",
      height: `${index === 0 ? "300px" : "140px"}`,
      width: `${index === 0 ? "300px" : "140px"}`,
      borderRadius: "12px",
      gridColumn: `${index === 0 ? "1 / span 2" : ""}`,
      gridRow: `${index === 0 ? "1 / span 2" : ""}`,
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      touchAction: 'none',
      alignItems: "center",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <>
        <div
          ref={ref}
          style={cardStyles}
          {...props}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative hidden md:flex hover:scale-105 duration-500 ${
            selected ? "border contrast-75" : ""
          }`}
          
        >
          <img className="rounded-[10px]" src={id} alt="" />
          <Checkbox
            isSelected={selected}
            name={id}
            id={id}
            className={`absolute top-2 left-2 ${
              selected ? "selectedImg" : ""
            } ${hovered ? "" : "md:hidden"}`}
            onValueChange={handleDeletedImages}
          ></Checkbox>
          {hovered && (
            <div className={` ${index === 0 ? "hidden" : ""} rounded-[10px] inset-0 bg-black bg-opacity-50 fixed duration-500 pointer-events-none`}></div>
          )}
        </div>
      </>
    );
  }
);

export default ItemCard;
