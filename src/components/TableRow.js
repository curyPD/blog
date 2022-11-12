import React, { useState, useRef } from "react";
import TdButton from "./TdButton";

function TableRow(props) {
  const trRef = useRef(null);

  const loadHandler = () =>
    props.i === 0 ? props.setTrHeight(trRef?.current.offsetHeight) : undefined;

  const itemProps = props.i === 0 ? { ref: trRef } : {};

  return (
    <tr {...itemProps}>
      <td className="py-2 px-3 md:py-3 md:px-4 lg:py-3 lg:px-5 lg:text-base xl:px-6">
        <img
          src={props.image.url}
          alt=""
          className="w-16 max-w-none rounded-sm md:w-20 lg:w-24"
          onLoad={loadHandler}
        />
      </td>
      <td className="py-2 px-3 font-serif text-xs font-medium text-gray-600 md:py-3 md:px-4 md:text-sm lg:py-3 lg:px-5 lg:text-base xl:px-6 xl:text-lg">
        {props.title}
      </td>
      <td className="py-2 px-3 text-[10px] font-normal text-gray-400 md:py-3 md:px-4 md:text-xs lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base">
        {props.id}
      </td>
      <td className="py-2 px-3 text-[10px] font-normal text-gray-400 md:py-3 md:px-4 md:text-xs lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base">
        {props.formattedDate}
      </td>
      <TdButton
        id={props.id}
        trHeight={props.trHeight}
        index={props.i}
        arrLength={props.arrLength}
        showPopup={props.showPopup}
        closePopup={props.closePopup}
        popupOpen={props.popupOpen}
        setEditedArticleId={props.setEditedArticleId}
        setPostIdToDelete={props.setPostIdToDelete}
        scrollToSection={props.scrollToSection}
      />
    </tr>
  );
}

export default TableRow;
