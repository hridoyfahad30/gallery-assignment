import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import img1 from "../../assets/images/image-1.webp";
import img2 from "../../assets/images/image-2.webp";
import img3 from "../../assets/images/image-3.webp";
import img4 from "../../assets/images/image-4.webp";
import img5 from "../../assets/images/image-5.webp";
import img6 from "../../assets/images/image-6.webp";
import img7 from "../../assets/images/image-7.webp";
import img8 from "../../assets/images/image-8.webp";
import img9 from "../../assets/images/image-9.webp";
import img10 from "../../assets/images/image-10.jpeg";
import img11 from "../../assets/images/image-11.jpeg";
import addImage from "../../assets/images/addImage.png";
import SortableCard from "./SortableCard";
import ItemCard from "./ItemCard";
import { Button, Card, Checkbox } from "@nextui-org/react";

const Gallery = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];
  const [deletedImg, setDeletedImg] = useState([]);
  const [items, setItems] = useState(images);
  const [activeId, setActiveId] = useState(null);
  const [chosenFiles, setChosenFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setChosenFiles([...chosenFiles, ...files]);

    images.push(files)
    
 };

  const handleDeleteImg = () => {
    const filteredArray1 = items.filter((item) => !deletedImg.includes(item));
    setDeletedImg([]);
    setItems(filteredArray1);
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);


  return (
    <div className="max-w-6xl mx-auto bg-[#fafafa]">
      <Card className="mx-4 md:mx-0 my-8">
        <div className="flex justify-between items-center border-b-2 p-4">
          {deletedImg.length === 0 ? (
            <h3 className="text-xl font-semibold">Gallery</h3>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <Checkbox isSelected={true}></Checkbox>{" "}
              <p className="text-xl font-semibold">
                {deletedImg.length} File{deletedImg.length > 1 ? "s" : ""}{" "}
                Selected
              </p>
            </div>
          )}
          {deletedImg.length >= 1 ? (
            <Button
              onClick={handleDeleteImg}
              className="bg-transparent text-red-500 font-medium text-lg hover:underline"
            >
              Delete file{deletedImg.length > 1 ? "s" : ""}
            </Button>
          ) : (
            ""
          )}
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items?.length !== 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-max mx-auto my-6">
                {items.map((id, index) => (
                  <SortableCard
                    key={index}
                    deletedImg={deletedImg}
                    setDeletedImg={setDeletedImg}
                    index={index}
                    id={id}
                  />
                ))}
                <div className="w-[144px] rounded-[10px] border-2 border-dashed border-slate-300 h-[144px] bg-slate-100 relative">
                  <input onChange={handleFileUpload} type="file" id="imageUpload" className="hidden" />
                  <label
                    htmlFor="imageUpload"
                    className="w-full h-full cursor-pointer flex flex-col items-center justify-center"
                  >
                    <img className="w-12 h-12" src={addImage} alt="" />
                    <h4 className="">Add Images</h4>
                  </label>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <h2 className="text-5xl font-bold uppercase my-40 text-center">
                  Reload the page
                </h2>
              </div>
            )}
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeId ? <ItemCard id={activeId} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </Card>
    </div>
  );
};

export default Gallery;
